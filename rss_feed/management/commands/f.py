
url = "https://nairametrics.com/2023/07/02/four-generative-ai-tools-nigerian-musicians-can-use-to-create-viral-songs/"


import feedparser

def get_channel_image(feed_url):
    # Parse the feed
    feed = feedparser.parse(feed_url)

    # Get the channel image URL
    channel_image = feed.feed.image.href if 'image' in feed.feed else None

    return channel_image

# Example usage
feed_url = url
channel_image_url = get_channel_image(feed_url)

if channel_image_url:
    print("Channel Image:", channel_image_url)
else:
    print("No channel image found for the feed.")
