/* How to implement FaStripe 

 1. install stripe react js
 2. Follow stripe github documentation
 3. get stripe public key from stripe account
 4. Must ensure on the test mode
5. Create payment intent post on the server and return client secret.
install stripe on the server side and get client secret. make sure you used the payment method types: ['card]
6. From client side get the client secret and save it.
7. use confirm card payment and pass user information, card and client secret
8. display transaction id in payment page after successfully complete transaction.
*/