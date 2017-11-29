import {
  INCREMENT,
  DECREMENT
} from 'app/actions/types/counter'

export const increment = () => ({
  type: INCREMENT
})

export const decrement = () => ({
  type: DECREMENT
})
