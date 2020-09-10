const functions = require("firebase-functions");
const admin = require("firebase-admin");
const vision = require("@google-cloud/vision");

const axios = require("axios");
const express = require("express");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert("./ServiceAccountKey.json"),
  storageBucket: "capstone-kinksaid.appspot.com",
});
const db = admin.firestore();

const app = express();
const main = express();

app.use(cors({ origin: true }));

main.use("/api/v1", app);
main.use(express.json());

function trimArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  return arr;
}

/* User End Points  */
app.post("/signUp", async (request, response) => {
  try {
    const { userEmail, password, userName, hairType } = request.body;
    newUser = await admin.auth().createUser({
      email: userEmail,
      password: password,
      displayName: userName
    })

    const userId = newUser.uid;
    const data = {
      userName,
      hairType,
      userEmail,
      userId
    };

    const usersRef = db.collection("Users").doc(userId);
    await usersRef.set(data);
    const user = await usersRef.get();

    response.json({
      id: user.id,
      data: user.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users/:id", async (request, response) => {
  try {
    const userId = request.params.id;

    if (!userId) throw new Error("User ID is required");

    const userData = await db.collection("Users").doc(userId).get();

    if (!userData.exists) {
      throw new Error("Results doesnt exist for this user.");
    }

    response.status(200).json({
      id: userData.id,
      data: userData.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

/* Ingredients End Points */
app.get("/ingredients", async (request, response) => {
  try {
    const ingredientsQuerySnapshot = await db.collection("Ingredients").get();

    const ingredientsList = [];
    ingredientsQuerySnapshot.forEach((doc) => {
      ingredientsList.push({
        id: doc.id,
        data: doc.data()
      });
    });

    response.status(200).json({
      data: ingredientsList
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

/* Events End Points */


/* Results End Points */
app.get("/results", async (request, response) => {
  try {
    const resultsQuerySnapshot = await db.collection("Results").get();
    const results = [];
    resultsQuerySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        data: doc.data()
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

    const data = {
      userId: userId,
      element: element,
    };
    const resultRef = db.collection("Results").doc(userId);
    await resultRef.set(data);
    const results = await resultRef.get();

    response.status(201).json({
      post: "success",
      id: results.id,
      data: results.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/scan", async (request, response) => {
  try {
    const { image, userId } = request.body;
    const client = new vision.ImageAnnotatorClient();
    
    const results = await client.textDetection(`gs://capstone-kinksaid.appspot.com/images/${image}`);
    const detections = results[0].textAnnotations.map((obj = { description }) => obj.description.toLowerCase().toString());
    const textArray = detections[0].match(/([a-zA-Z0-9][\s]*)+/g);
    const textDetected = trimArray(textArray);

    response.status(201).json({
      post: "success",
      data: textDetected
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/results/:id", async (request, response) => {
  try {
    const { elementsAdd } = request.body;
    const userId = request.params.id;

    const resultRef = db.collection("Results").doc(userId);
    await resultRef.update({
      element: admin.firestore.FieldValue.arrayUnion(elementsAdd),
    });
    const results = await resultRef.get();

    response.status(201).json({
      post: "success",
      id: results.id,
      data: results.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/results/:id", async (request, response) => {
  try {
    const userId = request.params.id;

    if (!userId) throw new Error("User ID is required");

    const userResults = await db.collection("Results").doc(userId).get();

    if (!userResults.exists) {
      throw new Error("Results doesnt exist for this user.");
    }

    response.status(200).json({
      id: userResults.id,
      data: userResults.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

exports.capstoneApi = functions.https.onRequest(main);

// http://localhost:5000/api/v1
// https://capstone-kinksaid.web.app/api/v1/

// axios.default
    //   .patch("https://capstone-kinksaid.web.app/api/v1/results/oukanah", {
    //     elementsAdd: [(elements = { vals })],
    //   })
    //   .then((res) => ())
    //   .catch((err) => console.error("error:=", err));

    // axios.default
    //   .post("https://capstone-kinksaid.web.app/api/v1/results", {
    //     userId: "oukanah",
    //     element: [(elements = { vals })],
    //   })
    //   .then((res) => ())
    //   .catch((err) => console.error("error:=", err));
