/* eslint-disable no-console */
import express from 'express';
import fetch from 'node-fetch';
import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the UMD Dining API!');
});

// Nicholas Urquhart GET controllers
router.route('/allmeals')
  .get(async (req, res) => {
    try {
      const results = await db.sequelizeDB.query(`SELECT meal_name, meals.meal_id, calories, cholesterol, serving_size, sodium, carbs, protein, fat FROM meals LEFT JOIN macros mac ON meals.meal_id=mac.meal_id`);
      res.json({data: results[0]});
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  });

router.route('/macros')
  .get(async (req, res) => {
    try {
      const result = await db.Macros.findAll();
      res.json({data: result});
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  })
  .post(async (req, res) => {
    const macros = await db.Macros.findAll();
    const nextMac = (await macros.length) + 1;
    try {
      const newMac = await db.Macros.create({
        macro_id: nextMac,
        calories: 400,
        serving_size: 15,
        cholesterol: 500,
        sodium: 206,
        carbs: 5,
        protein: 15,
        meal_id: 15,
        fat: 18
      });
      res.json(newMac);
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  });
router.route('/macros/:id')
  .get(async (req, res) => {
    try {
      const {id} = req.params;
      const result = await db.Macros.findOne({
        where: {
          macro_id: `${id}`
        }
      });
      res.json({data: result});
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  })
  .put(async (req, res) => {
    console.log(req.body);
    try {
      const {id} = req.params;
      await db.Macros.update(
        {
          sodium: req.body.sodium
        },
        {
          where: {
            macro_id: `${id}`
          }
        }
      );
      res.send('success');
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const {id} = req.params;
      await db.Macros.destroy({
        where: {
          macro_id: `${id}`
        }
      });
      res.send('Successfully Deleted');
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  });
// David McCoy GET Controllers
router.route('/dietaryRestrictions')
  .get(async (req, res) => {
    try {
      const restrictions = await db.DietaryRestrictions.findAll();
      res.json({data: restrictions});
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  })
  .post(async (req, res) => {
    const diets = await db.DietaryRestrictions.findAll();
    const nextDiet = (await diets.length) + 1;
    try {
      const newDiet = await db.DietaryRestrictions.create({
        restriction_id: nextDiet,
        restriction_type: 'gluten free'
      });
      res.json(newDiet);
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  });
router.route('/dietaryRestrictions/:id')
  .get(async (req, res) => {
    try {
      const {id} = req.params;
      const restrictions = await db.DietaryRestrictions.findOne({
        where: {
          restriction_id: `${id}`
        }
      });
      res.json({data: restrictions});
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const {id} = req.params;
      await db.DietaryRestrictions.update(
        {
          restriction_type: 'low fat'
        },
        {
          where: {
            restriction_id: `${id}`
          }
        }
      );
      res.send('Successfully Updated');
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  })
  .delete(async (req, res) => {
    try {
      const {id} = req.params;
      await db.DietaryRestrictions.destroy({
        where: {
          restriction_id: `${id}`
        }
      });
      res.send('Successfully Deleted');
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  });

// Josh Mensah GET Controllers
router.route('/josh')
  .get(async (req, res) => {
    try {
      const url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json';
      const data = await fetch(url);
      const json = await data.json();
      res.json({data: json[0]});
      console.log('success');
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  });
router.route('/josh')
  .get(async (req, res) => {
    try {
      const url = '';
      const data = await fetch(url);
      const json = await data.json();
      res.json({data: json[0]});
      console.log('success');
    } catch (err) {
      console.log(err);
      res.json({message: 'something went wrong'});
    }
  });

// Brian McMahon GET controllers
router.route('/brian')
  .get(async (req, res) => {
    try {
      const diningHall = await db.DiningHall.findAll();
      res.json({data: diningHall});
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  })
  .post(async (req, res) => {
    const allHalls = await db.DiningHall.findAll();
    const nextHall = (await allHalls.length) + 1;
    try {
      const newRecord = await db.DiningHall.create({
        hall_id: nextHall,
        hall_name: 'Another Dining Hall',
        hall_address: '589 Baltimore Ave, College Park MD',
        hall_lat: 45.628942,
        hall_long: 48.18151
      });
      res.json(newRecord);
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  });
router.route('/brian/:id')
  .get(async (req, res) => {
    try {
      const {id} = req.params;
      const diningHall = await db.DiningHall.findOne({
        where: {
          hall_id: `${id}`
        }
      });
      res.json({data: diningHall});
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  })
  .put(async (req, res) => {
    try { // Add a way to check if exists
      const {id} = req.params;
      await db.DiningHall.update(
        {
          hall_name: 'Updated Hall',
          hall_location: '123 Baltimore Ave, College Park MD',
          hall_lat: 46.628942,
          hall_long: 48.18151
        },
        {
          where: {
            hall_id: `${id}`
          }
        }
      );
      res.send('Successfully Updated');
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  })
  .delete(async (req, res) => {
    try {
      const {id} = req.params;
      await db.DiningHall.destroy({
        where: {
          hall_id: `${id}`
        }
      });
      res.send('Successfully Deleted');
    } catch (err) {
      console.log(err);
      res.json({message: 'Something went wrong'});
    }
  });

/// /////////////////////////////////
/// ////Dining Hall Endpoints////////
/// /////////////////////////////////
router.get('/dining', async (req, res) => {
  try {
    const halls = await db.DiningHall.findAll();
    const reply = halls.length > 0 ? { data: halls } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/dining/:hall_id', async (req, res) => {
  try {
    const hall = await db.DiningHall.findAll({
      where: {
        hall_id: req.params.hall_id
      }
    });

    res.json(hall);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/dining', async (req, res) => {
  const halls = await db.DiningHall.findAll();
  const currentId = (await halls.length) + 1;
  try {
    const newDining = await db.DiningHall.create({
      hall_id: currentId,
      hall_name: req.body.hall_name,
      hall_address: req.body.hall_address,
      hall_lat: req.body.hall_lat,
      hall_long: req.body.hall_long
    });
    res.json(newDining);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/dining/:hall_id', async (req, res) => {
  try {
    await db.DiningHall.destroy({
      where: {
        hall_id: req.params.hall_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/dining', async (req, res) => {
  try {
    await db.DiningHall.update(
      {
        hall_name: req.body.hall_name,
        hall_location: req.body.hall_location
      },
      {
        where: {
          hall_id: req.body.hall_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Meals Endpoints//////////
/// /////////////////////////////////
router.get('/meals', async (req, res) => {
  try {
    const meals = await db.Meals.findAll();
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/meals/:meal_id', async (req, res) => {
  try {
    const meals = await db.Meals.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/meals', async (req, res) => {
  try {
    await db.Meals.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Meal Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Macros Endpoints/////////
/// /////////////////////////////////
router.get('/macros', async (req, res) => {
  try {
    const macros = await db.Macros.findAll();
    res.send(macros);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/macros/:meal_id', async (req, res) => {
  try {
    const meals = await db.Macros.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/macros', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.Macros.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category,
        calories: req.body.calories,
        serving_size: req.body.serving_size,
        cholesterol: req.body.cholesterol,
        sodium: req.body.sodium,
        carbs: req.body.carbs,
        protein: req.body.protein,
        fat: req.body.fat
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// Dietary Restrictions Endpoints///
/// /////////////////////////////////
router.get('/restrictions', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll();
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/restrictions/:restriction_id', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll({
      where: {
        restriction_id: req.params.restriction_id
      }
    });
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// //////////////////////////////////
/// ///////Custom SQL Endpoint////////
/// /////////////////////////////////
const macrosCustom = 'SELECT `Dining_Hall_Tracker`.`Meals`.`meal_id` AS `meal_id`,`Dining_Hall_Tracker`.`Meals`.`meal_name` AS `meal_name`,`Dining_Hall_Tracker`.`Macros`.`calories` AS `calories`,`Dining_Hall_Tracker`.`Macros`.`carbs` AS `carbs`,`Dining_Hall_Tracker`.`Macros`.`sodium` AS `sodium`,`Dining_Hall_Tracker`.`Macros`.`protein` AS `protein`,`Dining_Hall_Tracker`.`Macros`.`fat` AS `fat`,`Dining_Hall_Tracker`.`Macros`.`cholesterol` AS `cholesterol`FROM(`Dining_Hall_Tracker`.`Meals`JOIN `Dining_Hall_Tracker`.`Macros`)WHERE(`Dining_Hall_Tracker`.`Meals`.`meal_id` = `Dining_Hall_Tracker`.`Macros`.`meal_id`)';
router.get('/table/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(macrosCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

const mealMapCustom = `SELECT hall_name,
  hall_address,
  hall_lat,
  hall_long,
  meal_name
FROM
  Meals m
INNER JOIN Meals_Locations ml 
  ON m.meal_id = ml.meal_id
INNER JOIN Dining_Hall d
ON d.hall_id = ml.hall_id;`;
router.get('/map/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(mealMapCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/custom', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(req.body.query, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

export default router;

/// JOSH MENSAH///
