import { Exam } from 'src/models/Exam'

export function quiz (state) {
  return new Exam(state.quiz)
}
