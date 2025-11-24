# Why is Golang Structured Like That?

If you come from the JS world and are starting your journey into fullstack development, you might be confused about why Golang project structure is super weird.

---
---
---

## Let's find out the reason behind it!

---
---
---

## Layered Architecture

There are many patterns in Golang projects, but the most common one is to separate the code into 3 layers:

- `Presentation Layer / Handler`: Layer to handle how our app is served to the world, including request, response, validation, and authentication
- `Business Layer / Service`: Layer to handle the business logic
- `Data Layer / Repository`: Layer to handle the data access

The idea is to put the business logic in the service layer and make sure it is not affected by how the app is served by the `Presentation Layer` or how the data is accessed by the `Data Layer`.

How do we implement it?

---
---
---
We will use the `Transfer` function as an example. Let's ignore how it will be served and how the data is accessed.

When transferring balance from one account to another, we need to:

1. Check if the transfer amount is valid
2. Find the sender
3. Find the receiver
4. Check the sender's balance
5. Update sender & receiver balance


```
// Services

type Service struct {
}

func (s *Service) Transfer(senderID string, receiverID string, amount int) error {

	// check if amount valid

	// find sender

	// find receiver

	// check sender balance

	// update balance

	return nil
}
```

From the code above, we need at least 2 interactions with the data:
- Get User By ID
- Update User Balance By ID

---
---
---

We enforce the implementation of `Get User By ID` and `Update User Balance By ID` by providing an interface that must be implemented by anyone who wants to use the service.

```
// Models

type User struct {
	ID      string
	Name    string
	Balance int
}

// Services

type Repository interface {
	FindUserByID(id string) (*User, error)
	UpdateUserBalance(id string, balance int) error
}

type Service struct {
	repository Repository
}
```

With that, we can implement the `Transfer` function that utilizes the repository

```
func (s *Service) Transfer(senderID string, receiverID string, amount int) error {

	// check if amount valid
	if amount <= 0 {
		return errors.New("amount must be greater than 0")
	}

	// find sender
	sender, err := s.repository.FindUserByID(senderID)
	if err != nil {
		return err
	}

	// find receiver
	receiver, err := s.repository.FindUserByID(receiverID)
	if err != nil {
		return err
	}

	// check sender balance
	if sender.Balance < amount {
		return errors.New("sender balance is not enough")
	}

	// update balance
	s.repository.UpdateUserBalance(senderID, sender.Balance-amount)
	s.repository.UpdateUserBalance(receiverID, receiver.Balance+amount)

	return nil
}
```
---
---
---
For example, let's create a simple script to transfer balance from Bob to Alice. In this example, let's just create a repository layer that stores users in memory

```
// Repositories

type HardCodedRepository struct {
	userMap map[string]User
}

func (r *HardCodedRepository) FindUserByID(id string) (*User, error) {
	user, exist := r.userMap[id]
	if !exist {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func (r *HardCodedRepository) UpdateUserBalance(id string, balance int) error {
	user, exist := r.userMap[id]
	if !exist {
		return errors.New("user not found")
	}
	user.Balance = balance
	r.userMap[id] = user
	return nil
}
```

And in the main function, let's initialize the user map data
```
func NewHardCodedRepository() *HardCodedRepository {
	userMap := make(map[string]User)
	// Init users
	userMap["user_abc"] = User{"user_abc", "Alice", 100}
	userMap["user_xyz"] = User{"user_xyz", "Bob", 50}
	return &HardCodedRepository{
		userMap: userMap,
	}
}

func main() {
	// Initialize service with repository that satisfy the interface provided
	service := Service{
		repository: NewHardCodedRepository(),
	}

	// Additional function to retrieve current balance
	aliceBalance1, _ := service.GetBalance("user_abc")
	bobBalance1, _ := service.GetBalance("user_xyz")

	fmt.Printf("Initial Balance : Alice (%d); Bob (%d)\n", aliceBalance1, bobBalance1)

	fmt.Println("Transfer 10 from Alice to Bob")
	_ = service.Transfer("user_abc", "user_xyz", 10)

	aliceBalance2, _ := service.GetBalance("user_abc")
	bobBalance2, _ := service.GetBalance("user_xyz")

	fmt.Printf("Initial Balance : Alice (%d); Bob (%d)\n", aliceBalance2, bobBalance2)
}
```
---
---
---

When you run the code, you will get the following output:
```
Initial Balance : Alice (100); Bob (50)
Transfer 10 from Alice to Bob
Initial Balance : Alice (90); Bob (60)
```

You can see the full code of this example in the next slide!
---
---
---
```
package main

import (
	"errors"
	"fmt"
)

// Models

type User struct {
	ID      string
	Name    string
	Balance int
}

// Services

type Repository interface {
	FindUserByID(id string) (*User, error)
	UpdateUserBalance(id string, balance int) error
}

type Service struct {
	repository Repository
}

func (s *Service) Transfer(senderID string, receiverID string, amount int) error {

	// check if amount valid
	if amount <= 0 {
		return errors.New("amount must be greater than 0")
	}

	// find sender
	sender, err := s.repository.FindUserByID(senderID)
	if err != nil {
		return err
	}

	// find receiver
	receiver, err := s.repository.FindUserByID(receiverID)
	if err != nil {
		return err
	}

	// check sender balance
	if sender.Balance < amount {
		return errors.New("sender balance is not enough")
	}

	// update balance
	s.repository.UpdateUserBalance(senderID, sender.Balance-amount)
	s.repository.UpdateUserBalance(receiverID, receiver.Balance+amount)

	return nil
}

func (s *Service) GetBalance(userID string) (int, error) {
	user, err := s.repository.FindUserByID(userID)
	if err != nil {
		return 0, err
	}
	return user.Balance, nil
}

// Repositories

type HardCodedRepository struct {
	userMap map[string]User
}

func (r *HardCodedRepository) FindUserByID(id string) (*User, error) {
	user, exist := r.userMap[id]
	if !exist {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func (r *HardCodedRepository) UpdateUserBalance(id string, balance int) error {
	user, exist := r.userMap[id]
	if !exist {
		return errors.New("user not found")
	}
	user.Balance = balance
	r.userMap[id] = user
	return nil
}

// Main code

func NewHardCodedRepository() *HardCodedRepository {
	userMap := make(map[string]User)
	// Init users
	userMap["user_abc"] = User{"user_abc", "Alice", 100}
	userMap["user_xyz"] = User{"user_xyz", "Bob", 50}
	return &HardCodedRepository{
		userMap: userMap,
	}
}

func main() {
	// Initialize service with repository that satisfy the interface provided
	service := Service{
		repository: NewHardCodedRepository(),
	}

	aliceBalance1, _ := service.GetBalance("user_abc")
	bobBalance1, _ := service.GetBalance("user_xyz")

	fmt.Printf("Initial Balance : Alice (%d); Bob (%d)\n", aliceBalance1, bobBalance1)

	fmt.Println("Transfer 10 from Alice to Bob")
	_ = service.Transfer("user_abc", "user_xyz", 10)

	aliceBalance2, _ := service.GetBalance("user_abc")
	bobBalance2, _ := service.GetBalance("user_xyz")

	fmt.Printf("Initial Balance : Alice (%d); Bob (%d)\n", aliceBalance2, bobBalance2)
}

```
---
---
---
With this approach, the transfer function doesn't change when you change how you store your data or how you serve the app. You can use HTTP, gRPC, or any other method to serve the app.