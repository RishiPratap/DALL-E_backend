const express = require("express");
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

const configuration = new Configuration({
    apiKey: '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',
  });

const openai = new OpenAIApi(configuration);

app.get("/", async(req, res) => {
    res.send("Hello World");
});

app.post('/goapi', async(req, res)=>{
    const {name} = req.body;
    console.log(name);
    const response = await openai.createImage({
        prompt: `${name}`,
        n: 1,
        size: "1024x1024",
      });
    var image_url = response.data.data[0].url;
    let objPost = {
			"receiver": image_url,
		}
    console.log(objPost);
		let jsonPost = JSON.stringify(objPost);
    res.send(jsonPost);
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});