import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    const meal = props.meal;
    const price = `$ ${meal.price.toFixed(2)}`;

  return (
    <div className={classes.meal}>
      <h3>{meal.name}</h3>
      <p className={classes.description}>{meal.description}</p>
      <p className={classes.price}>{price}</p>
      <div><MealItemForm /></div>
    </div>
  );
};

export default MealItem;
