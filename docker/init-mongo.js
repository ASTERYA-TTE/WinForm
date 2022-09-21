db.createUser(
    {
        user: "winform",
        pwd: "winform123", 
        roles : [
            {
                role: "readWrite",
                db: "winform"
            }
        ]
    }
)
