import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import {useEffect, useState} from 'react';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-apps-d4fbe-default-rtdb.firebaseio.com/food-order/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  ));

  return (
    <>
      {isLoading ? (<p className={classes.loading}>Loading ...</p>) : (
        <>
          {error ? (<p className={classes.error}>{error}</p>) : (
            <section className={classes.meals}>
              <Card>
                <ul>{mealsList}</ul>
              </Card>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default AvailableMeals;
