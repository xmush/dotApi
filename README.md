### STACK :
framework : addonis js
alasan : lebih terbiasa dengan patter laravel dan lebih cepat dalam pengembangan

### PATTERN
pattern yang digunakan adalah mvc namun karena ini RESTAPI maka kita saya menggunakan view. alasan saya menggunakan patter MVC karena mvc adalah pattern yang cukup popular dan mudah di pahami.

# minus
- tidak menggunakan redis
    saya belum familiar dengan penggunaan redis. tapi saya sebelumnya berencana untuk menerapkannya bersama middlewate agar tiap ada request method selain get maka redis cachenya di clear  
- tidak ada e2e testing
    tidak sempat mengetest
- error handling terpusat
    kurang paham maksut error handling terpusat namun saya menggunakan try catch untuk mengghandle error yang saya dapatkan
