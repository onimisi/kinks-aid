const functions = require("firebase-functions");
const admin = require("firebase-admin");
const vision = require("@google-cloud/vision");

const axios = require("axios");
const express = require("express");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert("./ServiceAccountKey.json"),
  storageBucket: "capstone-kinksaid.appspot.com"
});
const db = admin.firestore();

const app = express();
const main = express();

const client = new vision.ImageAnnotatorClient();

app.use(cors({ origin: true }));

main.use("/api/v1", app);
main.use(express.json());

app.post("/users", async (request, response) => {
  try {
    const { username, hairType, email } = request.body;
    const data = {
      username,
      hairType,
      email,
    };
    const usersRef = await db.collection("Users").add(data);
    const user = await usersRef.get();

    response.json({
      id: usersRef.id,
      data: user.data()
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/results", async (request, response) => {
  try {
    const resultsQuerySnapshot = await db.collection("Results").get();
    const results = [];
    resultsQuerySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    response.status(200).json(results);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/results", async (request, response) => {
  try {
    
    const { userId, element } = request.body;
    console.log("userId:=", userId, "elements:=", element)
    const data = {
      userId: userId,
      element: element
    };
    const resultRef = db.collection('Results').doc(userId);
    await resultRef.set(data);
    const results = await resultRef.get();

    response.status(201).json({
      post: "success",
      id: results.id,
      data: results.data()
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/results/:id", async (request, response) => {
  console.log('here')
  try {
    const { elementsAdd } = request.body;
    const userId = request.params.id

    const resultRef = db.collection('Results').doc(userId);
    await resultRef.update({
      element: admin.firestore.FieldValue.arrayUnion(elementsAdd)
    })
    const results = await resultRef.get();

    response.status(201).json({
      post: "success",
      id: results.id,
      data: results.data()
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/results/:id', async (request, response) => {
  try {
    const userId = request.params.id;

    if (!userId) throw new Error('User ID is required');

    const userResults = await db.collection('Results').doc(userId).get();

    if (!userResults.exists){
        throw new Error('Results doesnt exist for this user.')
    }

    response.status(200).json({
      id: userResults.id,
      data: userResults.data()
    });

  } catch(error){
    response.status(500).send(error);
  }

});

exports.capstoneApi = functions.https.onRequest(main);

exports.storageTrigger = functions.storage
  .object()
  .onFinalize(async (object) => {
    console.log("name: ", object.name, "bucket: ", object.bucket);
    const [result] = await client.textDetection(
      `gs://${object.bucket}/${object.name}`
    );
    const detections = result.textAnnotations;
    console.log("Text:-->", detections[0].description);
    let vals = []
    detections.forEach((text) => {
      console.log(text.description);
      vals.push(text.description);
    });

    axios.default.post('https://capstone-kinksaid.web.app/api/v1/results', {userId: "oukanah", element: vals })
    .then(res => console.log('sent'))
    .catch(err => console.error('error:=', err))
  });
