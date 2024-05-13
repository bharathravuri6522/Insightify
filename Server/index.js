const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const pg =require("pg");
require("dotenv").config();
const cors = require("cors");


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure OpenAI

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Define route for "/chat"
app.post("/chat", async (req, res) => {
    try {
        // Extract prompt from request body
        const { prompt,user,starrating } = req.body;
        console.log({prompt},{user},{starrating});

        // Call OpenAI to generate response
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "Act like a product manager, where suggestions need to be provided based on the review submitted by the user. The nature of the review need to be sensed and act based on that, if the review is positive then output format should be of a string [nature of feedback][team to be appreciated(just mention the team thats enough)], .Example: I have purchased the thermometer and this is working as expected and easy to use the output should be Nature: positive; Team :Design team ; Description : Ease of use. If the review is negative create a string of this format [nature of review]:[team to be notified] [issue(just stick to one issue no need to mention multiple issues)]\nEx: I thought this was finally a thermometer that worked with accurate and consistent temperatures… it is way more consistent than the others I’ve used, especially for a forehead one. However, today I took my baby to the doctor and after they took his temperature as 102.1 this thermometer showed the temperature as 98.6 (which I knew was wrong given how warm he was). I was truly shocked that it was 3.5 degrees off, this is a serious safety concern and I am throwing it out so I don’t make the mistake of using it again.\nAlso, it initially would scan the temperature quick and easily, however after a few uses I started having to press the button 5+ times to get and actual read.\nDon’t waste your money, and more importantly, don’t put yourself or your loved ones at risk using such an inaccurate thermometer. Expected output : Nature :Negative; Team :Quality assurance team; Description: Inaccurate temperature readings. The reason why i am asking you to provide output like Description is to maintain consistency in the output and this way we can capture both the best feature and the issue in the same heading. And i also want the output to be only either positive or negative if a review is slightly tilting to be a positive review say 51% positive and 49% negative instead of terming it neutral mention it as positive. So make sure we only provide the nature as either Positive or Negative and the output for both positive and negative should follow this format with headings Nature: --; Team: --; Description (limited to 50 character's including space and this should not contain any, in it): --; "

              },
              {
                "role": "user",
                "content": prompt
              }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        //-------------------------------------------
        const APIresponse = response.choices[0].message.content
        //console.log(APIresponse);
        const parts = APIresponse.split(';').map(part => part.trim().split(': '));

         parts.forEach(([key, value]) => {
             if (key === 'Nature') {
                 nature_value = value;
                 console.log(typeof nature_value);
             } else if (key === 'Team') {
                 team_value = value;
             } else if (key === 'Description') {
                 feature_value = value;
             }
          });
          console.log(nature_value,team_value,feature_value);

        //-------------------------------------------
        try{

            await db.query(`INSERT INTO reviewanalysis (nature,team,feature) VALUES ('${nature_value}','${team_value}', '${feature_value}')`);
            //console.log("The review has been successfully inserted");
            let reply;
            if (nature_value === 'Positive'){
                reply = "Thank you your feedback this helps us to keep motivated and do the good work we are doing."
            }
            else if(nature_value === 'Negative'){
                reply = `We are really sorry for the inconvenience we have highlighted the issue to ${team_value} and will work to rectify this issue in our future products.`
            }
            console.log(reply);
            await db.query(`INSERT INTO reviewdata (emailid,review,reply,rating) VALUES ('${user}','${prompt}','${reply}','${starrating}')`);
            res.send("Completed");

        }catch(error){
            res.status(500).json({ error: error.message });
        }



    } catch (error) {
        // If an error occurs, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
});
app.post("/dashboard",async(req,res) =>{
    try{
        const reviewData = await db.query("SELECT * FROM reviewdata");
        res.send(reviewData.rows);

    }catch(error){
        res.status(500).json({error: error.message});
    }
})

app.post("/viewstats",async(req,res)=>{
    try{
        const reviewAnalysis = await db.query("SELECT * from reviewanalysis");
        res.send(reviewAnalysis.rows);
    }catch(error){
        res.status(500).json({error: error.message});
    }

})
// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
