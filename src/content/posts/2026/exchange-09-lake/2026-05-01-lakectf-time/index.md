---
title: "LakeCTF Time"
timestamp: 2026-05-01T00:00:00Z
locations:
  - name: "EPFL campus"
    country: "Switzerland"
    city: "Ecublens"
    city_slug: "ecublens"
    gps: [46.5186594, 6.5665615]
    gps_source: openstreetmap
    gps_granularity: venue
    gps_confidence: high
    gps_query: "EPFL, Ecublens, Switzerland"
source:
  kind: telegram
  message_id: 7212
  imported_at: 2026-05-06T21:17:41.289Z
  date_basis: telegram
---
LakeCTF Time

OK LakeCTF is over so can share stuff

# LakeCTF Preparation
Setting up and stuff like that

There was a cool cold boot challenge that we couldn't get working so that was shag

# Food

LakeCTF Food

Similar to last year

Similarly good


# Challenges

## Modulato Bombo

It's the challenge made to force myself to dev hfsdr
Meant to be easy challenge to explore RF Side Channel Attacks 

Solve path
1. See the bomb
2. Use the custom SDR board to sniff the pwm signals
3. Enter the pin for flag (in the wrong flag format lmao, my bad) 

The concept is that high frequency wired signals emit RF waves for side channel attacks. 

It was fun deving for this challenge, not just hfsdr but learning how to handle tx though pwn. To make it easier, I intentionally removed the need for GNURadio, and let the pwm frequency be inaccurate (rp2350 pwm peripheral is not as exact as the fpga, but the fpga one is not too reliable somehow, in hindsight I could prob test more and make it work for more learning) 

Some infra issues is they needed briefing. And I was rushing around so sometimes they dismantled the bomb😢

I think the concept of the chall was interesting and I tuned it more to be easy, and that's exactly what I got, 8 solves
Quite satisfied for my scope

### Fun Fact:

I was trying to make my bomb chall more interesting.
And since it has been really frustrating to work with Greyhats recently (like it's been so goddamn frustrating in so many ways on so many levels, like screw greyhats). 
I decided to threaten 👀
Was worth the effort ngl


## Beyond Root

I got this challenge from the DEFCON SG Badge meeting, when Sprite_Tm suggested SPIFFS on the DEFCON SG1 badge, but said it didn't support directories (so some funny stuff could be done)

Solve path:
1. On Web portal OSINT Camera image to museum bolo
2. Inject the path into the form to read `/config.json` and get the WiFi credentials
3. Go to Museum Bolo, login, and nmap for the Camera
4. Access the SPIFFS shell, notice the file system and hint, and access the flag at /..[/flag]().txt

The infra was a mess, I think my phone's hot-spot couldn't support all the connections, and people were spamming XSS payload, but it got better in the end. 

People generally liked the onsite part, but the shell/ file directory path was divisive, some were ok and liked it, some thought it was stupid, dm but don't think people had too bad of an opinion

I was aiming for easy/medium and I kinda got that, 6/10 solves, tho was a bit sad couldn't be harder (I had ideas but I was too tired to cook)


# Other LakeCTF moments

I spent most of my morning checking in on my bomb chall, and then fixing my camera challenge, and then just monitoring. I was way too tired in the middle and just slept it all out, helped for Balelec lmao

Last year was really retro stuff for onsite, like NeXT, Commodore, which I found interesting, also had a DJ, but couldn't get this year

The challenges are a lot more involved onsite, arcades, social engineering, fishing. Also a lot of lain theming because pres wanted lmao

A different spin on things, but ultimately still LakeCTF, and I think it turned out quite well


# Apero

More free food
- It's the normal pizza supplier we use, but I do agree it's slightly worse than last year's LakeCTF, also we got a lot of excess pizzas lol
- I don't recognise a lot of faces from the teams last year, but I also know more people inside this year + challenge author, so people were asking me on my challenges and I could explain the intention, which was fun. Also nice catching hearing from flagbot etc, they have a custom pcb fab too to make custom pcbs for bjornctf wow

Then went Balelec

# Overall

Overall LakeCTF wise, I accomplished what I wanted to accomplish

Participated last year
Organised this year
1. Made 2 challenges which I think people found fun
2. Helped come up with interesting social media posts
3. Was the one who decided what the 1st and 2nd prizes were (yes I suggested the BladeRF and the Cynthion)

Was a really nice touch I could get the LakeCTF coin, only top 3 could get it usually

Main exchange goal complete, everything from here is sidequesting


Also fun note: Helped Cykor get to the metro lmao
