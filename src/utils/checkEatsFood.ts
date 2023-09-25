import { Coordinate } from "../types/types";

export const checkEatsFood = (
    head:Coordinate,
    food:Coordinate,
    area:number
): boolean =>{
    const distanceBetweenFoodAndSnakeX : number = Math.abs(head.x -food.x);
    const distanceBetweenFoodAndSnakey : number = Math.abs(head.y -food.y);
    return (
        distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakey<area
    )
}