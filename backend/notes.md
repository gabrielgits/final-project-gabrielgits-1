//Add User Profile
  app.patch("/users/:userId/profile", async (req, res) => {
    try {
        const userId = req.params.userId;
        const profileUpdates = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: profileUpdates }
        );

        res.status(200).send({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

//Retrieve User Profile:
app.get("/users/:userId/profile", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});


//Update User Profile (Partial Updates):
app.patch("/users/:userId/profile", async (req, res) => {
    try {
        const userId = req.params.userId;
        const profileUpdates = req.body;

        const updateFields = {};
        if (profileUpdates.phone) updateFields.phone = profileUpdates.phone;
        if (profileUpdates.password) updateFields.password = profileUpdates.password;
        if (profileUpdates.fullName) updateFields.fullName = profileUpdates.fullName;
        if (profileUpdates.address) updateFields.address = profileUpdates.address;

        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );

        res.status(200).send({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});
