import os
import random
import requests
import tweepy

# 1. Fetch live giveaway data from GamerPower API
def get_live_deal():
    try:
        response = requests.get("https://www.gamerpower.com/api/giveaways?type=game", timeout=10)
        giveaways = response.json()
        if isinstance(giveaways, list) and len(giveaways) > 0:
            deal = random.choice(giveaways[:10])  # Pick one from top 10 recent giveaways
            return deal["title"], deal["worth"], deal["platforms"]
    except Exception as e:
        print(f"API Fetch Error: {e}")
    return None, None, None

# 2. Setup X API Client (Tweepy Client v2)
client = tweepy.Client(
    consumer_key=os.environ["X_API_KEY"],
    consumer_secret=os.environ["X_API_SECRET"],
    access_token=os.environ["X_ACCESS_TOKEN"],
    access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"]
)

# 3. Generate Tweet Text
title, worth, platforms = get_live_deal()

if title:
    main_tweet = (
        f"Deal Alert: {title} is currently FREE ({worth} value) on {platforms}!\n\n"
        f"Track limited-time giveaways across Steam, Epic, & GOG in real time with Frapp—100% open-source & ad-free\n\n"
        f"#GamingDeals #FreeGames #OpenSource #buildinpublic"
    )
else:
    main_tweet = (
        "Never miss a limited-time free game on Steam, Epic Games, or GOG 🎮\n\n"
        "Frapp is an open-source, ad-free mobile dashboard tracking live game giveaways in real time \n\n"
        "#OpenSource #GamingDeals #FreeGames #buildinpublic"
    )

# 4. Post Main Tweet & Thread Reply with GitHub Link
try:
    response = client.create_tweet(text=main_tweet)
    main_tweet_id = response.data['id']
    print(f"Successfully posted main tweet: {main_tweet_id}")

    # Post thread reply to bypass link suppression
    reply_tweet = "Grab the build or check out the source code on GitHub 👇\nhttps://github.com/brianali-codes/Frapp"
    client.create_tweet(text=reply_tweet, in_reply_to_tweet_id=main_tweet_id)
    print("Successfully posted reply thread!")
except Exception as e:
    print(f"Error publishing tweet: {e}")
