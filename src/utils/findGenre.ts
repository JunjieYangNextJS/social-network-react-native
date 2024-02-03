const findGenre = (itemEndpoint: string) => {
    switch (itemEndpoint) {
      case "posts":
        return "post";
      case "stories":
        return "story";
      case "secrets":
        return "secret";
      default:
        return "creation";
    }
  };
  
  export const findParentRouteFromRoute = (route: string) => {
    switch (route) {
      case "postComments":
        return "posts";
      case "postReplies":
        return "posts";
      case "storyComments":
        return "stories";
      case "storyReplies":
        return "stories";
      case "secretComments":
        return "secrets";
      default:
        return;
    }
  };
  
  export default findGenre;
  