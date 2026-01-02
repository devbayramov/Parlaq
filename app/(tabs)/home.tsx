import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Summer Music Festivals Announced',
    description: 'Major music festivals coming this summer with top international artists.',
    date: '2 hours ago',
    category: 'Music',
  },
  {
    id: '2',
    title: 'Tech Innovation Summit 2024',
    description: 'Leading tech companies will showcase their latest innovations.',
    date: '5 hours ago',
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Art Exhibition Opens This Weekend',
    description: 'Local artists showcase their work in a stunning new gallery.',
    date: '1 day ago',
    category: 'Art',
  },
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Music Festival 2024',
    date: 'June 15, 2024',
    location: 'Istanbul, Turkey',
    category: 'Music',
    description: 'Grand music festival featuring famous artists.',
  },
  {
    id: '2',
    title: 'Tech Conference',
    date: 'June 22, 2024',
    location: 'Ankara, Turkey',
    category: 'Technology',
    description: 'Talks about AI, blockchain and future technologies.',
  },
];

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips for Attending Your First Music Festival',
    excerpt: 'Everything you need to know to make the most of your festival experience...',
    author: 'Sarah Johnson',
    date: 'May 20, 2024',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'The Future of Tech Events: Virtual vs In-Person',
    excerpt: 'Exploring how technology is changing the way we experience conferences...',
    author: 'Michael Chen',
    date: 'May 18, 2024',
    readTime: '7 min read',
  },
  {
    id: '3',
    title: 'How to Network Effectively at Business Events',
    excerpt: 'Learn the secrets of making meaningful connections at professional gatherings...',
    author: 'Emily Davis',
    date: 'May 15, 2024',
    readTime: '6 min read',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
        <ThemedText
          type="title"
          style={[styles.title, { fontFamily: Fonts.rounded }]}>
          Home
        </ThemedText>
        <ThemedText style={styles.subtitle}>Discover events, news, and insights</ThemedText>
      </View>

      {/* News Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Latest News
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {mockNews.map((news) => (
            <TouchableOpacity
              key={news.id}
              activeOpacity={0.8}
              style={[styles.newsCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
              <View style={[styles.newsCategoryBadge, { backgroundColor: '#0a7ea4' }]}>
                <Text style={styles.newsCategoryText}>{news.category}</Text>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.newsTitle}>
                {news.title}
              </ThemedText>
              <ThemedText style={styles.newsDescription} numberOfLines={2}>
                {news.description}
              </ThemedText>
              <ThemedText style={styles.newsDate}>{news.date}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Upcoming Events
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
          </TouchableOpacity>
        </View>
        {mockEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            activeOpacity={0.8}
            style={[styles.eventCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
            <View style={[styles.eventImage, { backgroundColor: isDark ? '#2a2a2a' : '#e5e5e5' }]}>
              <IconSymbol
                name="photo.fill"
                size={48}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
            </View>
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <ThemedText type="defaultSemiBold" style={styles.eventTitle}>
                  {event.title}
                </ThemedText>
                <View style={[styles.categoryBadge, { backgroundColor: '#0a7ea4' }]}>
                  <Text style={styles.categoryText}>{event.category}</Text>
                </View>
              </View>
              <ThemedText style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </ThemedText>
              <View style={styles.eventInfo}>
                <View style={styles.eventInfoItem}>
                  <IconSymbol
                    name="calendar"
                    size={14}
                    color={isDark ? Colors.dark.icon : Colors.light.icon}
                  />
                  <ThemedText style={styles.eventInfoText}>{event.date}</ThemedText>
                </View>
                <View style={styles.eventInfoItem}>
                  <IconSymbol
                    name="location.fill"
                    size={14}
                    color={isDark ? Colors.dark.icon : Colors.light.icon}
                  />
                  <ThemedText style={styles.eventInfoText}>{event.location}</ThemedText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Blog Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Event Blog
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
          </TouchableOpacity>
        </View>
        {mockBlogPosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            activeOpacity={0.8}
            style={[styles.blogCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
            <View style={styles.blogContent}>
              <ThemedText type="defaultSemiBold" style={styles.blogTitle}>
                {post.title}
              </ThemedText>
              <ThemedText style={styles.blogExcerpt} numberOfLines={2}>
                {post.excerpt}
              </ThemedText>
              <View style={styles.blogFooter}>
                <View style={styles.blogAuthor}>
                  <View style={[styles.authorAvatar, { backgroundColor: isDark ? '#2a2a2a' : '#e5e5e5' }]}>
                    <IconSymbol
                      name="person.fill"
                      size={16}
                      color={isDark ? Colors.dark.icon : Colors.light.icon}
                    />
                  </View>
                  <ThemedText style={styles.authorName}>{post.author}</ThemedText>
                </View>
                <View style={styles.blogMeta}>
                  <ThemedText style={styles.blogMetaText}>{post.date}</ThemedText>
                  <ThemedText style={styles.blogMetaText}> • </ThemedText>
                  <ThemedText style={styles.blogMetaText}>{post.readTime}</ThemedText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
  },
  seeAllText: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 24,
  },
  newsCard: {
    width: 280,
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  newsCategoryText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  newsTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.7,
    marginBottom: 12,
  },
  newsDate: {
    fontSize: 11,
    opacity: 0.5,
  },
  eventCard: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventContent: {
    flex: 1,
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  eventDescription: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.7,
    marginBottom: 12,
  },
  eventInfo: {
    gap: 8,
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventInfoText: {
    fontSize: 12,
    opacity: 0.7,
  },
  blogCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blogContent: {
    gap: 12,
  },
  blogTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  blogExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  blogAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: {
    fontSize: 12,
    opacity: 0.7,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogMetaText: {
    fontSize: 11,
    opacity: 0.5,
  },
});

