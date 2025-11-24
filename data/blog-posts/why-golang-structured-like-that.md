# Why Golang Structured Like That?

If you came from maybe JS world and start your journey into fullstack, you might be confused why golang projects structure is super wierd

---
---
---

## Lets find out the reason behind it!

---
---
---

## Layerd Architecture

There are so many pattern in golang projects, but the most common is by separate the code into 3 layers:

- `Presentation Layer / Handler` : Layer to handle how our app is served to the world, including request, response, validation, and authentication
- `Business Layer / Service` : Layer to handle the business logic`
- `Data Layer / Repository` : Layer to handle the data access

The idea is to put the business logic in the service layer, and make sure it is not affected by how the app is served by `Presentation Layer` and how the data is accessed by `Data Layer`.

How to implement it?

---
---
---
We will use `Transfer` function as example. Lets ignore how it will be served and how the data is accessed.

When transfer balance from one account to another, we need to:

1. Check if transfer amount valid
2. Find sender
3. Find receiver
4. Check sender balance
5. Update sender & receiver balance


```
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

We enforce the implementation of `Get User By ID` and `Update User Balance By ID` by providing interface that must be implemented by anyone who want to use the service.

```
// User Struct
type User struct {
	ID      string
	Name    string
	Balance int
}

// Repository Interface
type Repository interface {
	FindUserByID(id string) (User, error)
	UpdateUserBalance(id string, balance int) error
}

// Modify Service to use Repository
type Service struct {
	repository Repository
}
```

With that, we can implement `Transfer` function that utilize the repository

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