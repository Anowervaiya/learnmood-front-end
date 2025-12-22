export const ROLE = {
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  USER:"USER"
  
}

export const VISIBILITY = {
  PUBLIC : 'PUBLIC',
  FOLLOWERS : 'FOLLOWERS',
  FRIENDS : 'FRIENDS',
  ONLY_ME : 'ONLY_ME',
}

export const FRIEND_REQUEST_STATUS = {
  PENDING : 'PENDING',
  ACCEPTED : 'ACCEPTED',
  CANCELLED : 'CANCELLED',
}

export enum ReactType {
  like = 'like',
  love = 'love',
  haha = 'haha',
  sad = 'sad',
  angry = 'angry',
}

export enum EntityType {
  Post = 'Post',
  Challenge = 'Challenge',
  Story = 'Story',
  Service = 'Service',
}
export enum MEDIA_TYPE {
  image = 'image',
  video = 'video',
  raw = 'raw',
}
export enum ACCOUNT_TYPE {
  User = 'User',
  Page = 'Page',
}