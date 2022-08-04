# Satoshi.db
Küçük, hatasız, okunması ve değiştirilmesi kolay bir database modülüdür. Diğer modüllerde alınan hataların bu modülde çıkmaması üzerine kurulmuştur yani asıl amacı kullanıcıyı memnun etmektir, hız değildir. 

## Yükelemek İçin
```npm
npm install satoshi.db
```

## Dikkat
Bu modül node.js 12 ve üzeri sürümlerde daha sağlıklı çalışır.

## Güncelleme
- set() fonksiyonundaki glitch giderildi.

# Kullanım
```js
const db = require("Satoshi.db");

// Veri tabanına nesne ayarlama:
db.set("test", "deneme")
db.set("test", { "Ceza": 2, "Sebep": "Deneme"})

// Veri tabanından veri çekme:
db.get("test")
db.fetch("test")

// Veriyi silme:
db.delete("test")

// Veriye sayı ekleme çıkarma: 
// Not: Sadece sayısal verilere ekleme çıkarma yapabilirsiniz.
db.add("test.ceza", 1) // Ekleme
db.subtract("test.ceza", 1) // Çıkarma

// Veri tabanında verinin olup olmadığını kontrol etme:
db.has("test")

// Veri tabanındaki verinin ne türde olduğunu kontrol ettirme:
db.type("test.Sebep")

// Veri tabanına array sıkıştırmak veya geri çıkarmak:
db.push("test.name", ["Satoshi","Yoshito", "Alperen", "Muhammed", "Kubilay"]) // Sıkıştırır
db.pull("test.name", "Satoshi") // Çıkarır

// Veri tabanın hepsini bir değere aktarma:
const Satoshidb = db.all()

// Veri tabanın backupını almak:
// Not: Dosya türünü yazmayınız sadece adını yazmanız yeterli.
db.backup("<Dosya İsmi>")
db.backup("Satoshi")

// Veri tabanındaki tüm veriyi silmek:
db.deleteAll()
```

## İletişim
`Yoshito#1878`
`Satoshi#1878`
