var express = require('express');
var router = express.Router();
const {
    MessengerClient
} = require('messaging-api-messenger');
// get accessToken from facebook developers website
const client = MessengerClient.connect('EAAFAGZBbi1cUBAEzzNZBqXCAdYWFq7On6LK0vVVSAAHm2pcbM0DVj85b5WQaCiYZBN8HLNNENxpSNdlBbZC8HprHLfxnhzIbYVG8x2tsCP5GqgKMNuEjivosmNkySJR2vEY2CUpQIOqZC9tcXPZCYeqha3h4QlXYt6ZCfIZCVtirvAZDZD');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'CIB - Push Notifications'
    });
});

router.post('/', function(req, res) {
    var body = req.body;

    console.log(">>>>>>>>>>>> " + JSON.stringify(body));

    if (body.Text_Message) {

        client
            .createMessageCreative([{
                text: body.Text_Message
            }, ])
            .then(result => {
                console.log(result);
                // {
                //   message_creative_id: 938461089,
                // }

                client.sendBroadcastMessage(result.message_creative_id).then(result => {
                    console.log(result);
                    // {
                    //   broadcast_id: 827,
                    // }
                });

            });
    } else {
        client
            .createMessageCreative([{
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: [{
                            title: body.Card_Title,
                            image_url: body.Image_Url,
                            subtitle: body.Card_Description,
                            buttons: [{
                                type: 'web_url',
                                url: body.Offer_Url,
                                title: body.Button_Label,
                            }, ],
                        }, ],
                    },
                },
            }, ])
            .then(result => {
                console.log(result);
                // {
                //   message_creative_id: 938461089,
                // }

                client.sendBroadcastMessage(result.message_creative_id).then(result => {
                    console.log(result);
                    // {
                    //   broadcast_id: 827,
                    // }
                });

            });
    }
	//Not to send req body again after refresh
    res.writeHead(302, {
        'Location': '/'
        //add other headers here...
    });
    res.end();
});

module.exports = router;