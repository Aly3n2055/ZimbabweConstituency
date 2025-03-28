// Honorables data - hardcoded from honorables_data.json
const honorablesData = {
  "honorables": {
    "Mrs_Sithobekile_Ndlovu": {
      "name": "Mrs. Sithobekile Ndlovu",
      "role": "Donor Information Officer/Data Manager at NBSZ",
      "online_presence": {
        "linkedin": [
          "https://zw.linkedin.com/in/sithobekile-ndlovu-7bb156276",
          "https://zw.linkedin.com/in/sithobekile-ndlovu-sthoe-00452737"
        ],
        "facebook": "https://www.facebook.com/people/Sithobekile-Ndlovu/100068130408984"
      },
      "notes": "Active on social media; shares personal experiences including notable visits (e.g., Zambezi River)."
    },
    "Mr_Tauya_Mauka": {
      "name": "Mr. Tauya Mauka",
      "role": "Political Candidate for Kuwadzana West; former army serviceman",
      "education": [
        "Fatima Primary",
        "St. Roberts High",
        "Marondera High"
      ],
      "political_involvement": {
        "elections": [
          "Contested as Zanu-PF candidate",
          "Participated in Zanu-PF primary elections"
        ],
        "media_mentions": [
          "https://allafrica.com/stories/201504101565.html",
          "https://www.theafricareport.com/319766/zimbabwe-elections-kick-off-with-chaotic-voting-process-rigging-ploys/",
          "https://allafrica.com/stories/202310090011.html"
        ]
      },
      "online_presence": {
        "facebook": "https://www.facebook.com/p/Tauya-Mauka-100021980645655"
      },
      "notes": "Expressed concerns about election processes and post-election logistics."
    }
  },
  "data_sources": [
    "LinkedIn profiles for Mrs. Ndlovu",
    "Facebook profiles for both honorables",
    "AllAfrica news articles",
    "The Africa Report article on election processes"
  ],
  "recommendations": {
    "dedicated_profiles": "Create comprehensive, visually engaging profile pages for each honorable including background, achievements, and photos/videos (with consent).",
    "community_engagement": "Integrate interactive elements such as Q&A sessions, discussion boards, or comment sections for direct constituent interaction.",
    "visual_content": "Include approved images and videos from public appearances or community events.",
    "integration_with_webapp": "Ensure these profiles are easily accessible from the main navigation, with a clear link to the leadership hierarchy section."
  },
  "integration_instructions": "Pass this data to Replit's automation scripts or research modules. Use it to scrape additional public data if available, verify details, and then dynamically populate the webapp's dedicated sections for honorables. Ensure that any additional data pulled is cross-checked against the provided sources for accuracy."
};

export interface Honorable {
  name: string;
  role: string;
  education?: string[];
  political_involvement?: {
    elections?: string[];
    media_mentions?: string[];
  };
  online_presence?: {
    linkedin?: string[];
    facebook?: string;
  };
  notes?: string;
}

export interface HonorablesData {
  honorables: {
    [key: string]: Honorable;
  };
  data_sources: string[];
  recommendations: {
    [key: string]: string;
  };
  integration_instructions: string;
}

// Helper function to get honorables data
export function getHonorablesData(): HonorablesData {
  return honorablesData as HonorablesData;
}

// Helper function to get a specific honorable by key
export function getHonorableByKey(key: string): Honorable | undefined {
  const data = getHonorablesData();
  return data.honorables[key];
}

// Helper function to get all honorables as an array
export function getAllHonorables(): Honorable[] {
  const data = getHonorablesData();
  return Object.values(data.honorables);
}

// Helper function to get honorables data with offline capability
export async function getHonorablesDataAsync(): Promise<HonorablesData> {
  try {
    // Try to get data from cache if offline
    if (!navigator.onLine) {
      const { getOfflineData } = await import('./service-worker');
      const cachedData = await getOfflineData('honorables');
      
      if (cachedData) {
        console.log('Using cached honorables data');
        return cachedData as HonorablesData;
      }
    }
    
    // If online or no cached data, return the bundled data
    return honorablesData as HonorablesData;
  } catch (error) {
    console.error('Failed to retrieve honorables data:', error);
    // Fallback to bundled data
    return honorablesData as HonorablesData;
  }
}