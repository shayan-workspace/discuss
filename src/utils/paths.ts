export const paths = {
  home(): string {
    return "/";
  },

  topicShow(topicSlug: string): string {
    return `/topics/${topicSlug}`;
  },

  postShow(topicSlug: string, postId: string): string {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};
