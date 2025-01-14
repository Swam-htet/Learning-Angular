export interface Player {
  id: number
  name: string
  position: number
  color: string
}

export interface SnakeLadder {
  start: number
  end: number
  type: 'snake' | 'ladder'
}
