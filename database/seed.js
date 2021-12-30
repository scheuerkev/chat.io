require("dotenv").config();
const mongoose = require("mongoose");
const { Namespace, Room } = require("./models");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@chatio.58yn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection to seeder MongoDB ok");

    const ns1 = new Namespace({
      imageUrl: "/images/angular.png",
    });

    const ns2 = new Namespace({
      imageUrl: "/images/vue.png",
    });

    const ns3 = new Namespace({
      imageUrl: "/images/react.png",
    });

    ns1
      .save()
      .then((namespace) => {
        console.log("ns1 successfully created");
        const room1 = new Room({
          index: 0,
          namespace: namespace._id,
          title: "Miscellaneous",
        });
        const room2 = new Room({
          index: 1,
          namespace: namespace._id,
          title: "Code",
        });
        Promise.all([room1.save(), room2.save()])
          .then(() => {
            console.log("ns1' rooms successfully created");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    ns2
      .save()
      .then((namespace) => {
        console.log("ns2 successfully created");
        const room1 = new Room({
          index: 0,
          namespace: namespace._id,
          title: "Miscellaneous",
        });
        const room2 = new Room({
          index: 1,
          namespace: namespace._id,
          title: "Code",
        });
        Promise.all([room1.save(), room2.save()])
          .then(() => {
            console.log("ns2' rooms successfully created");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    ns3
      .save()
      .then((namespace) => {
        console.log("ns3 successfully created");
        const room1 = new Room({
          index: 0,
          namespace: namespace._id,
          title: "Miscellaneous",
        });
        const room2 = new Room({
          index: 1,
          namespace: namespace._id,
          title: "Code",
        });
        Promise.all([room1.save(), room2.save()])
          .then(() => {
            console.log("ns3' rooms successfully created");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
