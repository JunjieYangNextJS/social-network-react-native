export type About = "L" | "I" | "G" | "A" | "B" | "2S" | "T" | "+More" | "Q" | "General";
export type PostFilterAbout = "L" | "G" | "B" | "T" | "Q" | "I" | "A" | "2S" | "+More" | "General"

export type BackendRoutes = "posts" | "stories" | "secrets" 
| "postComments" | "storyComments" | "secretComments"
| "postReplies" | "storyReplies" | "secretReplies" | "users" 

export type Role = "user" | "admin" | "dev" | "bot"

export type WhoCanMessageMe = 'anyone' | 'friendsOnly' | 'none'

export type ExposedTo = 'public' | 'friendsOnly' | 'friendsAndFollowersOnly' | 'private'

export type SelectArray = { value: string; label: string }[];

export type SortByValue = "-lastCommentedAt" | "-likesCount" | "-commentCount"

export type DisplayedFollowing = {
    _id: string;
    photo: string;
    username: string;
    profileName: string;
    bio: string;
    gender: string;
    sexuality: string;
    role: Role;
    
}

export type Post = {
    _id: string,
    about: About,
    draft: boolean,
    exposedTo: ExposedTo,
    content: string,
    title: string,
    poll?: Poll[],
    pollEndsAt?: string,
    poster: User,
    createdAt: string,
    editedAt?: string,
    willNotify: boolean,
    pinned?: string | undefined,
    reports: Report[],
    subscribers: string[],
    likes: string[],
    likeCount: number,
    commentCount: number,
    lastCommentedAt: string,
    banned?: boolean,
    sticky: boolean,
    modFavored: boolean

};

export type Story = {
    _id: string,
    content: string,
    title: string,
    images?: string[],
    about?: string,
    storyTeller?: User,
    createdAt?: string,
    editedAt?: string,
    exposedTo?: ExposedTo,
    willNotify?: boolean,
    openComment?: boolean,
    reports?: Report[],
    subscribers?: string[],
    likes?: string[],
    likesCount?: number,
    commentCount?: number,
    lastCommentedAt?: string,
    pinned?: boolean,
    banned?: boolean,
    draft?: boolean,
    sticky?: boolean,
    modFavored?: boolean
};

export type Secret = {};

export type PostComment = {
    _id: string,
    commenter: User,
    post: Post,
    poster: User | string,
    willNotifyCommenter?: boolean,
    subscribers: string[],
    content: string,
    route?: string,
    reports?: Report[],
    createdAt: string,
    editedAt?: string | undefined,
    lastRepliedAt?: string,
    likes: string[],
    likesCount?: number,
    replyCount?: number,
    postReplies: PostReply[]
};

export type StoryComment = {};

export type PostReply = {
    _id: string,
    post: any,
    postComment: string,
    poster: string,
    commenter: string,
    content: string,
    replier: User,
    route: string,
    createdAt: string,
    editedAt?: string,
    reports: Report[],
    likes: string[]
};

export type StoryReply = {};

export type IncomingFriendRequest = {
    userId: string,
    username: string,
    profileName: string,
    photo: string,
    role: string,
    message?: string
};

export type ChatRoom = {
    _id: string,
    totalMessages: number,
    lastModified: string,
    lastMessage: string,
    users: {
        totalUnread: string,
        left: boolean,
        pinned: boolean,
        muted: boolean,
        _id: string,
        user: {
            _id: string,
            photo: string,
            whoCanMessageMe: string,
            username: string,
            profileName: string,
            id: string
        },
    }[]
}

export type ChatMessage = {
    _id: string,
    chatRoom: string,
    content: string,
    createdAt: string,
    id: string,
    sender: string
}

export type Report = {
    reporterId: string,
    reportedFor: string,
    _id: string
}

export type Poll = {
    label: string,
    votes: number,
    _id: string
}

export type Friend = {
    _id: string,
    gender?: string,
    id: string,
    photo: string,
    username: string,
    role: Role,
    sexuality?: string,
    profileName: string,
    friendList: string[] 
    whoCanMessageMe: WhoCanMessageMe,
    allowFriending: boolean,
    allowFollowing: boolean,
    followers: string[]
    incomingFriendRequests: IncomingFriendRequest[]
}

export type User = {
    _id: string,
    id: string,
    photo: string,
    role: Role,
    createdBy?: 'signup' | 'google' | 'guest',
    active: boolean,
    username: string,
    email: string,
    // password?: string,
    // passwordChangedAt: string
    
    createdAt: string,
    blockedUsers: string[],
    friendList: Friend[],
    profileName: string,
    incomingFriendRequests: IncomingFriendRequest[],
    bookmarkedPosts: string[],
    likedPosts: string[],
    hiddenPosts: string[],
    bookmarkedStories: string[],
    likedStories: string[],
    hiddenStories: string[],
    hiddenSecrets: string[],
    bookmarkedPostComments?: string[],
    likedPostComments: string[],
    bookmarkedStoryComments: string[],
    likedStoryComments: string[],
    chatRooms: ChatRoom[],
    bio?: string,
    gender?: string,
    location?: string,
    twitter?: string,
    profileImage: string,
    sexuality?: string,
    followers: string[],
    following: string[],
    postsExposedTo: ExposedTo,
    storiesExposedTo? : ExposedTo,
    secretsExposedTo? : ExposedTo,
    allowFollowing: boolean,
    allowFriending: boolean,

    whoCanMessageMe: WhoCanMessageMe ,
    myVotes: string[],
    imagesUploadedInHalfDay?: number,
    reports: Report[],
    silencedTill?: string,
    birthYear?: number,
    birthMonth?: number,
    birthDay?: number
}

export type NotificationReceiver = {
    read: boolean,
    checked: boolean,
    receiverIsMentioned: boolean,
    _id: string,
    receiver: string
}

export type NotificationSender = {
    role: Role,
    photo: string,
    _id: string,
    username: string,
    profileName: string,
    id: string
}

export type Notification = {
    sender: NotificationSender,
    receiver: NotificationReceiver[],
    content: string,
    route: BackendRoutes,
    commentId: string,
    replyId?: string,
    createdAt: string,
    id: string,
    postId?: string,
    storyId?: string,
    secretId?: string,
    someoneLiked?: boolean,
    anonymous: boolean,
    isFriendRequest: boolean,
    isFollow: boolean,
    _id: string
}

export type OtherUser = {
    _id: string,
    id: string,
    role: Role,
    photo: string,
    profileImage: string,
    whoCanMessageMe: WhoCanMessageMe,
    followers: string[],
    following: string[],
    allowFollowing: boolean,
    allowFriending: boolean,
    blockedUsers: string[],
    friendList: string[],
    username: string,
    profileName: string,
    createdAt: string,
    incomingFriendRequests: IncomingFriendRequest[],
    bio?: string,
    gender: string,
    location: string,
    sexuality: string,
}

export type BlockedUser = {
    _id: string,
    photo: string,
    role: string,
    username: string,
    profileName: string
}