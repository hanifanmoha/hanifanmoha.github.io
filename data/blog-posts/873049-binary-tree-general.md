# Analogi Binary Search Tree : Dunia Fantasi

![BST Analogy](bst-analogy.svg)

Di dunia fantasi ini, ada beberapa aturan:
- Semua orang boleh memiliki 1 nomor favorit
- Semua orang boleh memiliki maksimal seorang anak lelaki dan seorang anak perempuan
- Anak laki-laki dan seluruh keturunannya harus memiliki nomor favorit < orang tuanya
- Anak perempuan dan seluruh keturunannya harus memiliki nomor favorit > orang tuanya

##########

# Pertanyaan:

> Bagaimana cara mencari apakah di dunia ini  ada orang dengan nomor favorit 38?

##########

![BST Analogy Search](bst-analogy-search.svg)

- Untuk menemukan seseorang dengan nomor favorit 38, kita mulai dari orang pertama.
- Orang pertama memiliki nomor favorit 21. Karena 21 < 38, pasti nomor 38 ada pada anak perempuannya atau keturunannya.
- Anak perempuan 21 memiliki nomor favorit 35. Karena 35 < 38, pasti nomor 38 ada pada anak peremuannyanya lagi atau keturunannya.
- Anak perempuan 35 memiliki nomor favorit 42. Karena 38 < 42, pasti nomor 38 ada pada anak lelakinya atau keturunannya.
- Anak lelaki 35 memiliki nomor favorit 38. Inilah orang yang kita cari!

##########

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








