import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Coordinate } from '../types/types'
import { Colors } from '../globals/colors';

interface SnakeProps {
    snake: Coordinate[];
}

const Snake = ({snake}):JSX.Element => {
  return (
   <>
    {
        snake.map((segment:Coordinate,index:number)=>{
            const segmentStyle = {
                left:segment.x * 10,
                top: segment.y * 10,
            }
            return <View key={index} style={[styles.snake,segmentStyle]}>

            </View>
        })
    }
   </>
  )
}

export default Snake

const styles = StyleSheet.create({
    snake :{
        width:15,
        height:15,
        backgroundColor:Colors.primary,
        borderRadius:5,
        position:"absolute",
    }
})