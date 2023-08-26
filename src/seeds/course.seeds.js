const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Class = require("../api/models/class.models");

const courseArray = [
    {
      name: "DeepWeb",
      duration: "180 min",
      class:  1,
      type: "medium surface",
      img: "https://i0.wp.com/derechodelared.com/wp-content/uploads/2015/01/deepweb2.jpg?resize=592%2C379&ssl=1"
    },
    {
      name: "DarkWeb",
      duration: "500 min",
      class:  2,
      type: "deep surface", 
      img: "https://www.kaspersky.es/content/es-es/images/repository/isc/2020/deep-web-cover.jpg"
    },
    {
      name: "HackerX",
      duration: "120 min",
      class:  3,
      type: "ethical hacking",
      img: "https://www.commonsense.org/sites/default/files/styles/ratio_1_1_medium/public/jpeg/2022-08/hackerx_1.jpeg?itok=608-rZBM"
    }
  ];

const DB_URL= process.env.DB_URL;

mongoose.connect(DB_URL)
.then(async()=> {
    const allClass = await Class.find();
    if (allClass.length > 0) {
        await Class.collection.drop();
        console.log("collection erase");
    }
})
.catch((error)=> console.log("Retry",error))

.then(async ()=> {
    const courseMap = courseArray.map((course) => new Class(course));
    await Class.insertMany(courseMap);
    console.log("ok 2");
})
.catch((error) => console.log("Error", error))
.finally(()=> mongoose.disconnect())