import classes from "./MealItem.module.css";

const MealItem = (props) => {
    const meal = props.meal;
    const price = `$ ${meal.price.toFixed(2)}`;

  return (
    <div className={classes.meal}>
      <h3>{meal.name}</h3>
      <p className={classes.description}>{meal.description}</p>
      <p className={classes.price}>{price}</p>
    </div>
  );
};

export default MealItem;
