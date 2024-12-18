export interface Tweet {
  type: string;
  tweet_id: string;
  screen_name: string;
  bookmarks: number;
  favorites: number;
  created_at: string;
  text: string;
  lang: string;
  quotes: number;
  replies: number;
  conversation_id: string;
  retweets: number;
  views: string;
  entities: Entities;
  user_info: UserInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media: {
    photo?: {
      media_url_https: string;
      id: string;
      sizes: {
        h: number;
        w: number;
      };
    }[];
  };
}

export interface Entities {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hashtags: any[];
  media?: Medum[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  symbols: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timestamps: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  urls: any[];
  user_mentions: UserMention[];
}

export interface Medum {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_key: string;
  media_url_https: string;
  source_status_id_str?: string;
  source_user_id_str?: string;
  type: string;
  url: string;
  additional_media_info?: AdditionalMediaInfo;
  ext_media_availability: ExtMediaAvailability;
  sizes: Sizes;
  original_info: OriginalInfo;
  allow_download_status?: AllowDownloadStatus;
  video_info?: VideoInfo;
  media_results: MediaResults;
  features?: Features;
}

export interface AdditionalMediaInfo {
  monetizable: boolean;
  source_user?: SourceUser;
}

export interface SourceUser {
  user_results: UserResults;
}

export interface UserResults {
  result: Result;
}

export interface Result {
  __typename: string;
  id: string;
  rest_id: string;
  affiliates_highlighted_label: any[];
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  profile_image_shape: string;
  legacy: Legacy;
  professional?: Professional;
  tipjar_settings: any;
}

export interface Legacy {
  can_dm: boolean;
  can_media_tag: boolean;
  created_at: string;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities2;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  location: string;
  media_count: number;
  name: string;
  normal_followers_count: number;
  pinned_tweet_ids_str: string[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_image_url_https: string;
  profile_interstitial_type: string;
  screen_name: string;
  statuses_count: number;
  translator_type: string;
  verified: boolean;
  want_retweets: boolean;
  withheld_in_countries: any[];
  url?: string;
}

export interface Entities2 {
  description: Description;
  url?: Url;
}

export interface Description {
  urls: any[];
}

export interface Url {
  urls: Url2[];
}

export interface Url2 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Professional {
  rest_id: string;
  professional_type: string;
  category: Category[];
}

export interface Category {
  id: number;
  name: string;
  icon_name: string;
}

export interface ExtMediaAvailability {
  status: string;
}

export interface Sizes {
  large: Large;
  medium: Medium;
  small: Small;
  thumb: Thumb;
}

export interface Large {
  h: number;
  w: number;
  resize: string;
}

export interface Medium {
  h: number;
  w: number;
  resize: string;
}

export interface Small {
  h: number;
  w: number;
  resize: string;
}

export interface Thumb {
  h: number;
  w: number;
  resize: string;
}

export interface OriginalInfo {
  height: number;
  width: number;
  focus_rects: FocusRect[];
}

export interface FocusRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AllowDownloadStatus {
  allow_download: boolean;
}

export interface VideoInfo {
  aspect_ratio: number[];
  duration_millis: number;
  variants: Variant[];
}

export interface Variant {
  content_type: string;
  url: string;
  bitrate?: number;
}

export interface MediaResults {
  result: Result2;
}

export interface Result2 {
  media_key: string;
}

export interface Features {
  large: Large2;
  medium: Medium2;
  small: Small2;
  orig: Orig;
  all?: All;
}

export interface Large2 {
  faces: Face[];
}

export interface Face {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Medium2 {
  faces: Face2[];
}

export interface Face2 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Small2 {
  faces: Face3[];
}

export interface Face3 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Orig {
  faces: Face4[];
}

export interface Face4 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface All {
  tags: Tag[];
}

export interface Tag {
  user_id: string;
  name: string;
  screen_name: string;
  type: string;
}

export interface UserMention {
  id_str: string;
  name: string;
  screen_name: string;
  indices: number[];
}

export interface UserInfo {
  screen_name: string;
  name: string;
  description: string;
  rest_id: string;
  followers_count: number;
  favourites_count: number;
  avatar: string;
  verified: boolean;
  friends_count: number;
  location: string;
}
