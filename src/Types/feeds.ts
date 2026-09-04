// export type FeedPost = {
//   post_id: number;
//   user_id: number;
//   username: string;
//   title: string;
//   description: string;
//   likes: number;
//   comments: number;
//   is_liked: boolean;
//   created_at: string;
// };

// export type FeedTask = {
//   id: number;
//   user_id: number;
//   employer_id: number;
//   username: string;
//   profile_pics: string;
//   title: string;
//   description: string;
//   reward: number;
//   role: string;
//   status: string;
//   deadline: string;
//   applicant_count: number;
// };

// export type DashboardFeedItem = {
//   type: "post" | "task";
//   post?: FeedPost | null;
//   task?: FeedTask | null;
// };

// export type CommentResponse = {
//   comment_id: number;
//   user_id: number;
//   username: string;
//   avatar: string;
//   comment: string;
//   created_at: string;
//   updated_at: string;
// };

// export type MixedFeedPost = {
//   id: number;
//   type: "post";
//   user_id: number;
//   username: string;
//   profile_pics?: string;
//   title: string;
//   description: string;
//   likes: number;
//   comments: number;
//   is_liked: boolean;
//   created_at: string;
// };

export type FeedPost = {
  id: number;
  type: "post";
  user_id: number;
  username: string;
  profile_pics?: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  is_liked: boolean;
  created_at: string;
};

export type FeedTask = {
  id: number;
  type: "task";

  user_id: number;
  employer_id: number;

  username: string;
  profile_pics: string;

  title: string;
  description: string;

  reward: number;
  role: string;
  status: string;
  deadline: string;

  applicant_count: number;

  created_at: string;
};

export type DashboardFeedItem = FeedPost | FeedTask;

export type CommentResponse = {
  comment_id: number;
  user_id: number;
  username: string;
  avatar: string;
  comment: string;
  created_at: string;
  updated_at: string;
};
