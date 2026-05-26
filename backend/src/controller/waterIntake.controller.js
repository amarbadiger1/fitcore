import waterModel from "../models/water.model.js";


// ======================================
// GET TODAY WATER
// ======================================

export const getWater = async (req, res) => {

    try {

        const userId = req.id;

        // TODAY DATE
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // FIND TODAY WATER
        const water = await waterModel.findOne({

            user: userId,

            date: today
        });

        if (!water) {
            return res.status(404).json({
                message: "Not"
            });
        }

        return res.status(200).json({

            success: true,

            water: water
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"
        });
    }
};


export const addWater = async (req, res) => {

    try {

        const userId = req.id;

        // TODAY DATE
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // FIND TODAY WATER
        let water = await waterModel.findOne({

            user: userId,

            date: today
        });

        // IF NOT EXIST CREATE NEW DAILY DOC
        if (!water) {

            water = await waterModel.create({

                user: userId,

                amount: 250,

                date: today
            });
        }

        // OTHERWISE UPDATE TODAY DOC
        else {

            if (water.amount >= 5000) {

                return res.status(400).json({

                    success: false,

                    message: "Daily Limit Reached"
                });
            }

            water.amount += 250;

            if (water.amount > 5000) {
                water.amount = 5000;
            }

            await water.save();
        }

        return res.status(200).json({

            success: true,

            message: "250ml Added",

            water
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"
        });
    }
};

// ======================================
// DELETE TODAY WATER
// ======================================

export const deleteWater = async (req, res) => {

    try {

        const userId = req.id;

        // START OF TODAY
        const startOfDay = new Date();

        startOfDay.setHours(0, 0, 0, 0);

        // END OF TODAY
        const endOfDay = new Date();

        endOfDay.setHours(23, 59, 59, 999);


        // FIND TODAY WATER
        const water = await waterModel.findOne({

            user: userId,

            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }

        });

        if (!water) {

            return res.status(404).json({

                success: false,

                message: "No Water Data Found"
            });
        }

        // REMOVE 250ML
        water.amount -= 250;

        // PREVENT NEGATIVE VALUES
        if (water.amount < 0) {
            water.amount = 0;
        }

        await water.save();


        return res.status(200).json({

            success: true,

            message: "250ml Removed",

            water

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"
        });
    }
};