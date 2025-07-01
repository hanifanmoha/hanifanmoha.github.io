# Apa itu Binary Search Tree?

`Binary Tree` / `Binary Search Tree` / `Pohon Biner` biasa disingkat BST.

Kalau kamu butuh data structure yang `insert` dan `search` nya lumayan cepat, BST mungkin bisa jadi pilihan tepat karena performanya `O(log n)`

![BST Diagram](bst-general.svg)

BST adalah graph yang setiap nodenya punya `value` dan 2 child, `left` dan `right`.


```
type Node struct {
  value int
  left *Node
  right *Node
}

```

Tiap node harus mematuhi sebuah rule ==>

##########

Sebelum bahas rulenya, kita perjelas dulu kalau BST ini bisa kita bayangkan seperti pohon yang terbalik.

Kalau pohon yang kita lihat sehari-hari akarnya ada dibawah, di BST justru bagian paling atas yang disebut `root` / akar, dan cabangnya mengarah ke bawah.

# Rule BST

> Semua node yang ada di sebelah kiri, valuenya < root. Semua node yang ada di sebelah kanan, valuenya > root

![BST With Notations](bst-with-notations.svg)

##########

# Leaf / Daun

Node yang ada diujung - yang nggak punya child - biasa disebut leaf

Karena kita pakai pointer, artinya leaf itu node yang pointer `left` dan `right`nya `null`

##########

# Recursive

Karena setiap node nya harus memenuhi rule yang sama, kebanyakan operasi di BST bisa dibuat menggunkaan `recursive`

Operasi yang biasa dilakukan di BST:

- Seach
- Insert
- Delete

##########

# Search

### Problem

Jika nilai `val` ada di BST, return `true`, jika tidak, return `false`

### Ide

![BST Search](bst-search.svg)

##########

### Code - Search

```

func search(n *Node, val int) bool {
  if n == nil {
    return false
  }

  if val == n.value {
    return true
  } else if val < n.value {
    return search(n.left, val)
  } else {
    return search(n.right, val)
  }
}

```

Idenya, kita mulai dari root dan rekursif ke subtree kanan atau kiri. Kalau kita sampai node `null`, artinya value yang kita cari nggak ada.








