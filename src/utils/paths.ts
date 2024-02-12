export const paths = {
  home(): string {
    return "/";
  },

  topicShow(topicSlug: string): string {
    return `/topics/${topicSlug}`;
  },

  postCreate(topicSlug: string): string {
    return `/topics/${topicSlug}/posts/new`;
  },

  postShow(topicSlug: string, postId: string): string {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};
