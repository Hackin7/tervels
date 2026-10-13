# Telegram import review - October 8, 2026

Imported 70 new articles and added a cover and Telegram provenance to one existing Japan Expo haul article. The import accounts for 187 staged posts and 1,042 source messages. Dubai and Zurich were excluded from this import; their existing website articles remain unchanged.

All 191 original staged Markdown files were retained in [the staging folder](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging>). Their hashes and original Telegram bodies were verified. No staged Markdown or asset was deleted, moved, overwritten, or edited. The existing Japan Expo haul body was also preserved exactly; its original Telegram wording is retained in its source sidecar.

New article bodies contain the staged source bodies in source order, separated only by Markdown horizontal rules. No paraphrasing, trimming, heading changes, or spelling corrections were applied. Each article now links all available contributing photos through its `gallery` list, with its cover displayed once. Photos are optimized local copies, shown as lazy-loaded thumbnails linked to full-size images. Original photo references and local mappings remain in its adjacent `telegram-sources.json`. Unavailable videos or other attachments are listed there.

Visit days follow your reference calendar where matched. Noon in the destination timezone is a placeholder when the calendar provides a day without a time; original Telegram posting instants remain in the sidecar and `source.telegram_timestamp`. Top-row July 20-26 dates were inferred from the following visible July 27-August 2 week. Tentative grouping and date matches are listed below.

Location metadata includes identifiable mentions as well as day destinations. `context` and `review_note` distinguish planned, skipped, comparative, retrospective, and uncertain references. Coordinates were not guessed. Calendar activities with no matching Telegram evidence are recorded for review and do not add fabricated article text.

Both `.gitignore` files were left unchanged. `src/content/.gitignore` currently ignores the 70 new article directories, so they exist locally and build successfully but do not appear in normal Git status. Review ignore rules when you are ready to track them. Nothing was staged, committed, or deployed.

Validation: `npm run build` passed (327 pages), and `npm test` passed (101 tests in 13 files). All 71 affected article routes were generated. Verified exact message coverage, unchanged source Markdown/export, unchanged pre-existing article bodies, and matching cover copies.

## Files to adjust

Edit each linked `index.md` for title, body, date, locations, experiences, or its `gallery` list. The adjacent `telegram-sources.json` retains the source evidence. Suggested-exclusion flags are advisory: all 19 flagged source posts are retained for your manual decisions. Unresolved standalone items are under `_unsorted`.

| # | Article | Photos | Source posts | Telegram messages | Review |
| --- | --- | ---: | ---: | ---: | --- |
| 1 | [Lowkey shit fish rice lol](<../src/content/posts/2026/singapore-local-return-period/2026-07-17-return-flight/index.md>) | 2 | 1 | 3 | New article |
| 2 | [Estimated final count:](<../src/content/posts/2026/singapore-local-return-period/2026-07-17-exchange-return-reflections/index.md>) | 13 | 5 | 15 | New article |
| 3 | [1st thing to discuss fyp](<../src/content/posts/2026/_unsorted/2026-07-17-1st-thing-discuss-fyp-10468/index.md>) | 1 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 4 | [Last tervel of the summer](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-last-tervel-of-the-summer/index.md>) | 2 | 2 | 2 | New article |
| 5 | [average swiss camera scam](<../src/content/posts/2026/_unsorted/2026-07-18-average-swiss-camera-scam-10472/index.md>) | 0 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 6 | [Hello everyone, I’m giving out my Canon EOS Rebel SL3 camera w 18-55mm lens for free. I bought it a while ago and it's still in good shape. It has never been dropped or has any damages but I’ve stopped using it](<../src/content/posts/2026/_unsorted/2026-07-18-hello-everyone-m-giving-out-canon-10473/index.md>) | 1 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 7 | [Exchange Events Tier List](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-events-tier-list/index.md>) | 0 | 1 | 1 | New article |
| 8 | [Exchange Locations Ranking](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-locations-ranking/index.md>) | 0 | 1 | 1 | New article |
| 9 | [Nature](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-nature-ranking/index.md>) | 0 | 1 | 1 | New article |
| 10 | [Things I did back in SG](<../src/content/posts/2026/singapore-local-return-period/2026-07-19-things-i-did-back-in-sg/index.md>) | 10 | 1 | 10 | New article |
| 11 | [Back to flying 🤡](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-arrival/index.md>) | 10 | 6 | 20 | New article |
| 12 | [2nd round of appraisal](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-22-shanghai-appraisal-day-2-and-evening/index.md>) | 36 | 8 | 62 | New article; Date review |
| 13 | [Went to 上海交通大学 to register and draw ballots](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-registration/index.md>) | 17 | 2 | 17 | New article; Date review |
| 14 | [Afterwards it's just testing and testing and testing](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-21-shanghai-appraisal-day-1/index.md>) | 9 | 3 | 18 | New article; Date review |
| 15 | [Was gonna skip this poster ceremony but after advice from a senior, at least went to take a look](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-23-shanghai-ceremony-and-espressif/index.md>) | 90 | 8 | 110 | New article; Date review |
| 16 | [Went back to yu garden, this is somehow only my 2nd time](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-24-shanghai-final-city-day/index.md>) | 34 | 7 | 41 | New article; Date review |
| 17 | [Anyway besides being depressed we then quickly saw](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-25-shanghai-departure/index.md>) | 3 | 1 | 3 | New article; Date review |
| 18 | [The food is good and we're back in SG](<../src/content/posts/2026/singapore-local-return-period/2026-07-25-back-in-sg/index.md>) | 6 | 2 | 14 | New article |
| 19 | [Science Centre is gonna close soon so here's some pics videos](<../src/content/posts/2026/singapore-local-return-period/2026-07-26-science-centre-outing/index.md>) | 2 | 2 | 20 | New article; Date review |
| 20 | [Professional larping session🤡🤡🤡](<../src/content/posts/2026/singapore-local-return-period/2026-07-29-jump-trading-outing/index.md>) | 7 | 1 | 7 | New article; Date review |
| 21 | [Japan Expo Paris Haul ish](<../src/content/posts/2026/exchange-15-japan-expo-paris/2026-07-29-japan-expo-paris-haul/index.md>) | 2 | 1 | 2 | Existing article updated; Date review |
| 22 | [The start of a very long journey](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-outbound-flight/index.md>) | 6 | 2 | 6 | New article |
| 23 | [Spent](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-ho-chi-minh-arrival-and-evening/index.md>) | 8 | 2 | 20 | New article |
| 24 | [Banh Mi](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-banh-mi/index.md>) | 5 | 1 | 9 | New article |
| 25 | [OK next stop](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-transit-to-brisbane/index.md>) | 4 | 3 | 6 | New article |
| 26 | [Brisbane](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-01-brisbane-arrival-and-city/index.md>) | 20 | 4 | 40 | New article; Date review |
| 27 | [Updates coming later than usual, got kinda lazy](<../src/content/posts/2026/_unsorted/2026-08-02-updates-coming-later-than-usual-got-10874/index.md>) | 0 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 28 | [Queensland Museum](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-02-brisbane-museums-and-galleries/index.md>) | 88 | 10 | 96 | New article; Date review |
| 29 | [Gold coast](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-03-gold-coast-coombabah-and-surfers-paradise/index.md>) | 33 | 7 | 44 | New article; Date review |
| 30 | [Side note fk I left 10+ maibear and maicab badges at my friends house fk](<../src/content/posts/2026/_unsorted/2026-08-05-side-note-fk-left-10-maibear-11018/index.md>) | 0 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 31 | [Went to Mt coot tha and hiked](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-04-brisbane-uq-and-mount-coot-tha/index.md>) | 23 | 3 | 23 | New article; Date review |
| 32 | [Vancouver](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-vancouver-layover/index.md>) | 7 | 2 | 11 | New article; Date review |
| 33 | [SPL BBQ](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-las-vegas-arrival/index.md>) | 14 | 3 | 21 | New article; Date review |
| 34 | [OK goodbye Brisbane](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-goodbye-brisbane/index.md>) | 9 | 1 | 10 | New article; Date review |
| 35 | [Movies watched](<../src/content/posts/2026/_unsorted/2026-08-06-movies-watched-11106/index.md>) | 0 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 36 | [Quick who wants merch you have like 5 min](<../src/content/posts/2026/_unsorted/2026-08-06-quick-who-wants-merch-have-like-11107/index.md>) | 4 | 1 | 5 | New article; Unresolved / standalone; Suggested exclusion retained |
| 37 | [So LineCon](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-06-linecon-costco-and-dinner/index.md>) | 21 | 3 | 28 | New article; Date review |
| 38 | [If you asked me if I would have come back 1 year aho, I'll probably have said no](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-07-defcon-day-1/index.md>) | 24 | 6 | 34 | New article; Date review |
| 39 | [Defcon day 2](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-08-defcon-day-2/index.md>) | 33 | 8 | 44 | New article; Date review |
| 40 | [Left some gifts for the polygl0ts people it was fun to hang out with them](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-09-defcon-day-3-and-farewell/index.md>) | 8 | 4 | 13 | New article; Date review |
| 41 | [Got a long sandwich for bfast lol, quite nice](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-flight-to-seattle/index.md>) | 4 | 2 | 6 | New article; Date review |
| 42 | [DEFCON 34 reflections](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-defcon-34-reflections/index.md>) | 1 | 2 | 2 | New article; Date review |
| 43 | [Southcenter mall](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-southcenter-and-round-1/index.md>) | 22 | 6 | 42 | New article; Date review |
| 44 | [Anyway Mt Rainier Skyline Trail](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-11-mount-rainier-skyline-trail/index.md>) | 17 | 4 | 26 | New article; Date review |
| 45 | [Slept in that day and went out later](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-12-tipsoo-lake-and-meteor-shower/index.md>) | 26 | 6 | 28 | New article; Date review |
| 46 | [RAISING CANES](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-13-road-trip-and-raising-canes/index.md>) | 1 | 2 | 8 | New article; Date review |
| 47 | [Waterfront ft. Korean fair](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-seattle-city-and-airport/index.md>) | 7 | 7 | 21 | New article; Date review |
| 48 | [The food quite mid ngl](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-flight-to-seoul/index.md>) | 14 | 3 | 14 | New article; Date review |
| 49 | [Seoul station and walking around Seoul](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-15-seoul-layover/index.md>) | 53 | 9 | 61 | New article; Date review |
| 50 | [yeah almost missed my flight lol but got priority queue access](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-16-homebound-flight/index.md>) | 9 | 1 | 9 | New article; Date review |
| 51 | [and with that the last tervel of the summer has ended, reflections & stats coming soon](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-17-summer-travels-wrap-up/index.md>) | 0 | 1 | 1 | New article |
| 52 | [In Swiss, you can only get a Macs for the price of 2 meals🤡](<../src/content/posts/2026/singapore-local-return-period/2026-08-22-food-comparison/index.md>) | 2 | 1 | 2 | New article |
| 53 | [didnt know my slack had more invitations lol](<../src/content/posts/2026/_unsorted/2026-08-22-didnt-know-slack-had-more-invitations-11488/index.md>) | 1 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 54 | [one of the first tervels before tervels was a thing, the ISITDTU CTF](<../src/content/posts/2026/_unsorted/2026-08-25-isitdtu-retrospective/index.md>) | 0 | 1 | 1 | New article |
| 55 | [Need to remind myself to go for this and just kaypoh a bit](<../src/content/posts/2026/_unsorted/2026-08-25-https-www-reddit-com-r-defcon-11490/index.md>) | 0 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 56 | [Ngl being a UTR RA sounds like an awesome job](<../src/content/posts/2026/_unsorted/2026-08-26-ngl-being-utr-ra-sounds-like-11491/index.md>) | 0 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 57 | [I wonder when my epfl mod mapping will be finalised](<../src/content/posts/2026/_unsorted/2026-08-27-wonder-when-epfl-mod-mapping-will-11492/index.md>) | 0 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 58 | [lmao I just sent the mapping because I didn't properly read Diana's email](<../src/content/posts/2026/_unsorted/2026-09-02-lmao-just-sent-mapping-because-didn-11493/index.md>) | 2 | 1 | 2 | New article; Unresolved / standalone; Suggested exclusion retained |
| 59 | [NUSC Makers Market](<../src/content/posts/2026/singapore-local-return-period/2026-09-07-nusc-makers-market/index.md>) | 5 | 1 | 5 | New article |
| 60 | [Exchange Wrap Up slides lol](<../src/content/posts/2026/_unsorted/2026-09-07-exchange-wrap-up-slides/index.md>) | 1 | 1 | 1 | New article |
| 61 | [My Shanghai Trip claim🔥](<../src/content/posts/2026/_unsorted/2026-09-09-shanghai-trip-claim-11501/index.md>) | 1 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 62 | [gg](<../src/content/posts/2026/_unsorted/2026-09-09-gg-11502/index.md>) | 1 | 1 | 1 | New article; Unresolved / standalone; Suggested exclusion retained |
| 63 | [Off By One 2026](<../src/content/posts/2026/singapore-local-return-period/2026-09-15-off-by-one-2026/index.md>) | 8 | 1 | 10 | New article |
| 64 | [Bro where are my CLIC Donuts in NUS](<../src/content/posts/2026/_unsorted/2026-09-16-clic-donuts/index.md>) | 1 | 2 | 2 | New article; Suggested exclusion retained |
| 65 | [After a few months (and midway into the sem) my exchange mapping is finally done and that's the proper end to my exchange yay](<../src/content/posts/2026/_unsorted/2026-09-23-exchange-mapping-finalised/index.md>) | 6 | 4 | 6 | New article; Suggested exclusion retained |
| 66 | [Back to Tervels Content on Youtube!](<../src/content/posts/2026/singapore-local-return-period/2026-09-25-tervels-youtube-update/index.md>) | 0 | 1 | 1 | New article |
| 67 | [I didn't know utown air con area is open on weekend nights wtf](<../src/content/posts/2026/singapore-local-return-period/2026-09-26-utown/index.md>) | 1 | 1 | 1 | New article |
| 68 | [Was here last year with Espressif before going shanghai](<../src/content/posts/2026/singapore-local-return-period/2026-09-28-ritz-carlton-and-tinytapeout/index.md>) | 11 | 2 | 11 | New article |
| 69 | [Oh yeah Nice Hack happened last sat/ sun](<../src/content/posts/2026/singapore-local-return-period/2026-09-26-nice-hack/index.md>) | 8 | 1 | 10 | New article; Date review |
| 70 | [YIH](<../src/content/posts/2026/singapore-local-return-period/2026-10-05-yih/index.md>) | 0 | 1 | 2 | New article |
| 71 | [Podcasting](<../src/content/posts/2026/_unsorted/2026-10-08-podcasting/index.md>) | 0 | 1 | 1 | New article |

## File-by-file source mapping and review notes

### 1. Singapore return flight

[src/content/posts/2026/singapore-local-return-period/2026-07-17-return-flight/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-07-17-return-flight/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-lowkey-shit-fish-rice/`
- Article timestamp: `2026-07-17T09:26:02+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Return flight to Singapore (Singapore / Singapore; mentioned) - Return flight to Singapore; airport/airline unresolved.
- Cover: source post 10451.
- Grouping notes: Keep separate from excluded Dubai sightseeing.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-07-17-return-flight/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10451 - 2026-07-17-lowkey-shit-fish-rice/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-lowkey-shit-fish-rice/index.md>) (messages 10451, 10452, 10453).

Review flags:

- Post 10451: **missing-media** - 1 unavailable attachments

### 2. Exchange return reflections

[src/content/posts/2026/singapore-local-return-period/2026-07-17-exchange-return-reflections/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-07-17-exchange-return-reflections/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-estimated-final-count/`
- Article timestamp: `2026-07-17T09:26:30+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; retrospective); Switzerland (Switzerland / Unknown; retrospective) - Switzerland (retrospective; locality unknown).
- Cover: source post 10454.
- Grouping notes: Combine budget and return-day reflections in source order. Captionless 10464 needs visual review. Claims/cancellation admin is an optional exclusion, retained.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-07-17-exchange-return-reflections/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10454 - 2026-07-17-estimated-final-count/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-estimated-final-count/index.md>) (messages 10454, 10455, 10456, 10457, 10458, 10459, 10460, 10461, 10462, 10463).
  - [Post 10464 - 2026-07-17-untitled-10464/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-untitled-10464/index.md>) (messages 10464, 10465).
  - [Post 10466 - 2026-07-17-well-exchange-over/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-well-exchange-over/index.md>) (messages 10466).
  - [Post 10469 - 2026-07-17-m-autopiloting-much-faster/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-m-autopiloting-much-faster/index.md>) (messages 10469).
  - [Post 10470 - 2026-07-17-gomo-cancellation-need-pay/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-gomo-cancellation-need-pay/index.md>) (messages 10470).

Review flags:

- Post 10464: **needs-context** - Captionless media/location batch: attachment needs review
- Post 10469: **no-photo** - No exported photo for this post
- Post 10470: **no-photo** - No exported photo for this post

### 3. Review standalone 10468

[src/content/posts/2026/_unsorted/2026-07-17-1st-thing-discuss-fyp-10468/index.md](<../src/content/posts/2026/_unsorted/2026-07-17-1st-thing-discuss-fyp-10468/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-07-1st-thing-discuss-fyp/`
- Article timestamp: `2026-07-17T13:57:00+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: source post 10468.
- Grouping notes: FYP administration rather than an outing
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-07-17-1st-thing-discuss-fyp-10468/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10468 - 2026-07-17-1st-thing-discuss-fyp/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-1st-thing-discuss-fyp/index.md>) (messages 10468).

Review flags:

- Post 10468: **suggest-exclude** - FYP administration rather than an outing

### 4. Summer trip introduction

[src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-last-tervel-of-the-summer/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-last-tervel-of-the-summer/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-last-tervel-summer/`
- Article timestamp: `2026-07-30T02:32:27+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; mentioned); Brisbane (Australia / Brisbane; planned) - Brisbane (planned); Las Vegas / DEF CON (United States / Las Vegas; planned) - Las Vegas / DEF CON (planned); Seattle (United States / Seattle; planned) - Seattle (planned); Unspecified transits (Singapore / Singapore; visited).
- Cover: source post 10471.
- Grouping notes: Topic exception to day grouping: combine earlier sponsorship update and introduction. Planned destinations are not completed visits.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-last-tervel-of-the-summer/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10471 - 2026-07-17-fk-yeah-defcon-ticket/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-17-fk-yeah-defcon-ticket/index.md>) (messages 10471).
  - [Post 10814 - 2026-07-29-last-tervel-summer/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-29-last-tervel-summer/index.md>) (messages 10814).

### 5. Review standalone 10472

[src/content/posts/2026/_unsorted/2026-07-18-average-swiss-camera-scam-10472/index.md](<../src/content/posts/2026/_unsorted/2026-07-18-average-swiss-camera-scam-10472/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-07-average-swiss-camera-scam/`
- Article timestamp: `2026-07-18T14:07:59+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: none.
- Grouping notes: Unrelated camera-scam commentary
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-07-18-average-swiss-camera-scam-10472/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10472 - 2026-07-18-average-swiss-camera-scam/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-18-average-swiss-camera-scam/index.md>) (messages 10472).

Review flags:

- Post 10472: **suggest-exclude** - Unrelated camera-scam commentary
- Post 10472: **no-photo** - No exported photo for this post

### 6. Review standalone 10473

[src/content/posts/2026/_unsorted/2026-07-18-hello-everyone-m-giving-out-canon-10473/index.md](<../src/content/posts/2026/_unsorted/2026-07-18-hello-everyone-m-giving-out-canon-10473/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-07-hello-everyone-m-giving/`
- Article timestamp: `2026-07-18T14:07:59+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: source post 10473.
- Grouping notes: Unrelated forwarded camera giveaway
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-07-18-hello-everyone-m-giving-out-canon-10473/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10473 - 2026-07-18-hello-everyone-m-giving/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-18-hello-everyone-m-giving/index.md>) (messages 10473).

Review flags:

- Post 10473: **suggest-exclude** - Unrelated forwarded camera giveaway
- Post 10473: **forwarded** - Forwarded source retained; check attribution/context

### 7. Exchange events tier list

[src/content/posts/2026/_unsorted/2026-07-19-exchange-events-tier-list/index.md](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-events-tier-list/index.md>)

- Website route: `/tervels/posts/germany/nuremberg/2026-07-exchange-events-tier-list/`
- Article timestamp: `2026-07-19T05:54:01+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Embedded World (Germany / Nuremberg; retrospective); ph0wn (France / Nice; retrospective); Hackaday Europe (Unknown / Unknown; retrospective); Insomnihack (Switzerland / Lausanne; retrospective); LakeCTF (Switzerland / Lausanne; retrospective); Midnight Sun Conference (Unknown / Unknown; retrospective); Open Hardware Summit (Unknown / Unknown; retrospective); Helvetic Coding Contest (Unknown / Unknown; retrospective); J-Rave (Unknown / Unknown; retrospective); DoKomi (Germany / Dusseldorf; retrospective); Anisong Festa (Unknown / Unknown; retrospective); Japan Expo Paris (France / Villepinte; retrospective); Ankama concert (Unknown / Unknown; retrospective); PolyManga (Switzerland / Montreux; retrospective); GreyCTF (Unknown / Unknown; retrospective); DEFCON SG (Unknown / Unknown; retrospective).
- Cover: none.
- Grouping notes: Retrospective article, not a new visit day. Preserve tiers and wording. Match venues against existing event/trip metadata later.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-events-tier-list/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10474 - 2026-07-18-exchange-events-tier-list/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-18-exchange-events-tier-list/index.md>) (messages 10474).

Review flags:

- Post 10474: **no-photo** - No exported photo for this post

### 8. Exchange locations ranking

[src/content/posts/2026/_unsorted/2026-07-19-exchange-locations-ranking/index.md](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-locations-ranking/index.md>)

- Website route: `/tervels/posts/italy/unknown/2026-07-exchange-locations-ranking/`
- Article timestamp: `2026-07-19T06:09:01+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Italy (Italy / Unknown; retrospective); Poland (Poland / Unknown; retrospective); Czech Republic / Prague (Czechia / Prague; retrospective); UK / London (United Kingdom / London; retrospective); Barcelona (Spain / Barcelona; retrospective); Berlin (Germany / Berlin; retrospective); East Side Gallery (Germany / Berlin; retrospective); Denmark (Denmark / Unknown; retrospective); Stockholm (Sweden / Stockholm; retrospective); Møns Klint (Denmark / Møn; retrospective) - Møns Klint (source: Monts Klint); Vasa Museum (Sweden / Stockholm; retrospective); Bratislava (Slovakia / Bratislava; retrospective); Devin Castle? (Unknown / Unknown; retrospective) - Devin Castle? (source: divy castle; confirm); Salzburg (Austria / Salzburg; retrospective); Germany (Germany / Unknown; retrospective); Nuremberg (Germany / Nuremberg; retrospective) - Nuremberg (source: Nuremburg); Munich (Germany / Munich; retrospective); Dusseldorf (Germany / Dusseldorf; retrospective); France (France / Unknown; retrospective); Paris (France / Paris; retrospective); Chamonix (France / Chamonix; retrospective).
- Cover: none.
- Grouping notes: Retrospective place references. Country-only and ambiguous references need review, not invented city coordinates.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-locations-ranking/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10475 - 2026-07-18-exchange-locations-ranking/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-18-exchange-locations-ranking/index.md>) (messages 10475).

Review flags:

- Post 10475: **no-photo** - No exported photo for this post

### 9. Exchange nature ranking

[src/content/posts/2026/_unsorted/2026-07-19-exchange-nature-ranking/index.md](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-nature-ranking/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-07-nature/`
- Article timestamp: `2026-07-19T06:28:01+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Dent de Vaulion (Unknown / Unknown; retrospective); La Sarraz? (Unknown / Unknown; retrospective) - La Sarraz? (source: La Serraz; confirm); Trümmelbach Falls? (Switzerland / Lauterbrunnen; retrospective) - Trümmelbach Falls? (source: Tummelbach water; confirm); Jorat Park (Unknown / Unknown; retrospective); Møns Klint (Denmark / Møn; retrospective) - Møns Klint (source: Monts Klint); Seven Sisters (United Kingdom / East Sussex; retrospective); Avoriaz (France / Avoriaz; retrospective); Chamonix (France / Chamonix; retrospective); Zermatt (Switzerland / Zermatt; retrospective); Grindelwald (Switzerland / Grindelwald; retrospective).
- Cover: none.
- Grouping notes: Resolve uncertain names in metadata only; do not alter original wording.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-07-19-exchange-nature-ranking/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10476 - 2026-07-18-nature/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-18-nature/index.md>) (messages 10476).

Review flags:

- Post 10476: **no-photo** - No exported photo for this post

### 10. Singapore between trips

[src/content/posts/2026/singapore-local-return-period/2026-07-19-things-i-did-back-in-sg/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-07-19-things-i-did-back-in-sg/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-things-did-back-sg/`
- Article timestamp: `2026-07-19T22:42:02+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Monster Curry (Singapore / Singapore; visited) - Monster Curry (branch unknown); Maimai arcade (Singapore / Singapore; visited) - Maimai arcade (unknown).
- Cover: source post 10477.
- Grouping notes: 
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-07-19-things-i-did-back-in-sg/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10477 - 2026-07-19-things-did-back-sg/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-19-things-did-back-sg/index.md>) (messages 10477, 10478, 10479, 10480, 10481, 10482, 10483, 10484, 10485, 10486).

### 11. Shanghai journey and arrival

[src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-arrival/index.md](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-arrival/index.md>)

- Website route: `/tervels/posts/china/shanghai/2026-07-back-flying/`
- Article timestamp: `2026-07-20T00:50:46+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Shanghai (China / Shanghai; visited); Singapore departure airport (Singapore / Singapore; visited); China Eastern flight (China / Shanghai; visited); Shanghai arrival airport (China / Shanghai; visited); Unnamed Shanghai hotel (China / Shanghai; visited); Meituan vendors (China / Shanghai; visited).
- Cover: source post 10487.
- Grouping notes: Journey spans July 19 departure announcement and July 20 uploads. Airport identities need confirmation; hotel video unavailable. Emirates is a comparison, not a new Dubai visit.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-arrival/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10487 - 2026-07-19-back-flying/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-19-back-flying/index.md>) (messages 10487).
  - [Post 10488 - 2026-07-19-refresher-china-eastern-airlines/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-19-refresher-china-eastern-airlines/index.md>) (messages 10488).
  - [Post 10489 - 2026-07-19-pillow-blanket-wtf/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-19-pillow-blanket-wtf/index.md>) (messages 10489).
  - [Post 10496 - 2026-07-20-good-food-unlike-plain/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-20-good-food-unlike-plain/index.md>) (messages 10496, 10497, 10498, 10499, 10500, 10501, 10502, 10503, 10504, 10505).
  - [Post 10506 - 2026-07-20-wtf-hotel/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-20-wtf-hotel/index.md>) (messages 10506).
  - [Post 10507 - 2026-07-20-back-meituan-lol/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-20-back-meituan-lol/index.md>) (messages 10507, 10508, 10509, 10510, 10511, 10512).

Review flags:

- Post 10488: **no-photo** - No exported photo for this post
- Post 10496: **missing-media** - 8 unavailable attachments
- Post 10506: **missing-media** - 1 unavailable attachments
- Post 10506: **no-photo** - No exported photo for this post
- Post 10507: **forwarded** - Forwarded source retained; check attribution/context

### 12. Shanghai appraisal day 2 and evening

[src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-22-shanghai-appraisal-day-2-and-evening/index.md](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-22-shanghai-appraisal-day-2-and-evening/index.md>)

- Website route: `/tervels/posts/china/shanghai/2026-07-2nd-round-appraisal/`
- Article timestamp: `2026-07-22T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Shanghai is a placeholder because actual visit time is unknown.
- Locations: Shanghai (China / Shanghai; visited); Intel Embedded Cup venue (China / Shanghai; visited); People's Square (China / Shanghai; visited); Pond/waterfall at People's Square (China / Shanghai; visited); D Mall (China / Shanghai; visited); Liella venue (China / Shanghai; visited) - Liella venue (unidentified); SJTU banquet venue (China / Shanghai; visited); ZX Mall / GiGO (China / Shanghai; visited); Unnamed mall near hotel (China / Shanghai; visited); Bookshop and maimai arcade (China / Shanghai; visited).
- Cover: source post 10566.
- Grouping notes: Calendar July 22 matches appraisal, walking, SJTU banquet and shopping mall. ZX Mall late mention and unnamed mall attachment are tentative; explicit banquet/appraisal dates are stronger matches.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-22-shanghai-appraisal-day-2-and-evening/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10519 - 2026-07-22-ok-competition-judging-over/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-ok-competition-judging-over/index.md>) (messages 10519).
  - [Post 10556 - 2026-07-22-2nd-round-appraisal/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-2nd-round-appraisal/index.md>) (messages 10556, 10557, 10558, 10559, 10560, 10561, 10562, 10563, 10564, 10565).
  - [Post 10566 - 2026-07-22-went-time-went-pond/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-went-time-went-pond/index.md>) (messages 10566, 10567, 10568, 10569, 10570, 10571, 10572, 10573, 10574, 10575).
  - [Post 10576 - 2026-07-22-d-mall-same-as/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-d-mall-same-as/index.md>) (messages 10576, 10577, 10578, 10579, 10580, 10581, 10582, 10583, 10584, 10585).
  - [Post 10586 - 2026-07-23-liella-moment/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-23-liella-moment/index.md>) (messages 10586, 10587, 10588, 10589, 10590, 10591, 10592, 10593, 10594, 10595).
  - [Post 10596 - 2026-07-23-banquet-food/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-23-banquet-food/index.md>) (messages 10596, 10597, 10598, 10599, 10600, 10601, 10602, 10603, 10604, 10605).
  - [Post 10606 - 2026-07-23-oh-shit-forgot-mention/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-23-oh-shit-forgot-mention/index.md>) (messages 10606).
  - [Post 10607 - 2026-07-23-mall-near-hotel/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-23-mall-near-hotel/index.md>) (messages 10607, 10608, 10609, 10610, 10611, 10612, 10613, 10614, 10615, 10616).

Review flags:

- Post 10519: **no-photo** - No exported photo for this post
- Post 10556: **missing-media** - 10 unavailable attachments
- Post 10556: **no-photo** - No exported photo for this post
- Post 10566: **missing-media** - 5 unavailable attachments
- Post 10586: **forwarded** - Forwarded source retained; check attribution/context
- Post 10596: **missing-media** - 7 unavailable attachments
- Post 10606: **missing-media** - 1 unavailable attachments
- Post 10606: **no-photo** - No exported photo for this post
- Post 10607: **missing-media** - 2 unavailable attachments

### 13. Shanghai registration

[src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-registration/index.md](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-registration/index.md>)

- Website route: `/tervels/posts/china/shanghai/2026-07-went-register-draw-ballots/`
- Article timestamp: `2026-07-20T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Shanghai is a placeholder because actual visit time is unknown.
- Locations: Shanghai (China / Shanghai; visited); Shanghai Jiao Tong University (China / Shanghai; mentioned) - Shanghai Jiao Tong University (campus unresolved); Registration venue (China / Shanghai; visited); Meal-coupon dining venue (China / Shanghai; visited).
- Cover: source post 10520.
- Grouping notes: Registration and free-meal captions were uploaded on July 22. Map registration to calendar July 20. Top week dates are inferred because headers are cropped.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-20-shanghai-registration/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10520 - 2026-07-22-went-register-draw-ballots/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-went-register-draw-ballots/index.md>) (messages 10520, 10521, 10522, 10523, 10524, 10525, 10526, 10527, 10528).
  - [Post 10529 - 2026-07-22-got-free-meal-coupons/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-got-free-meal-coupons/index.md>) (messages 10529, 10530, 10531, 10532, 10533, 10534, 10535, 10536).

### 14. Shanghai appraisal day 1

[src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-21-shanghai-appraisal-day-1/index.md](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-21-shanghai-appraisal-day-1/index.md>)

- Website route: `/tervels/posts/china/shanghai/2026-07-afterwards-s-just-testing/`
- Article timestamp: `2026-07-21T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Shanghai is a placeholder because actual visit time is unknown.
- Locations: Shanghai (China / Shanghai; visited); Intel Embedded Cup venue (China / Shanghai; visited); Unnamed souffle pancake vendor (China / Shanghai; visited).
- Cover: source post 10548.
- Grouping notes: Calendar July 21 names Appraisal 1, VLM work, wake word and YOLO testing. The testing caption also references setup/model work across July 20-21; retain it intact and flag that span rather than split/rewrite it.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-21-shanghai-appraisal-day-1/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10538 - 2026-07-22-afterwards-s-just-testing/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-afterwards-s-just-testing/index.md>) (messages 10538, 10539, 10540, 10541, 10542, 10543, 10544, 10545, 10546, 10547).
  - [Post 10548 - 2026-07-22-did-presentation-demo-2nd/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-did-presentation-demo-2nd/index.md>) (messages 10548, 10549, 10550, 10551).
  - [Post 10552 - 2026-07-22-souffle-pancakes-midnight/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-22-souffle-pancakes-midnight/index.md>) (messages 10552, 10553, 10554, 10555).

Review flags:

- Post 10538: **missing-media** - 3 unavailable attachments
- Post 10548: **missing-media** - 3 unavailable attachments
- Post 10552: **missing-media** - 3 unavailable attachments

### 15. Shanghai ceremony and Espressif outings

[src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-23-shanghai-ceremony-and-espressif/index.md](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-23-shanghai-ceremony-and-espressif/index.md>)

- Website route: `/tervels/posts/china/shanghai/2026-07-gonna-skip-poster-ceremony/`
- Article timestamp: `2026-07-23T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Shanghai is a placeholder because actual visit time is unknown.
- Locations: Shanghai (China / Shanghai; visited); Award ceremony / poster venue (China / Shanghai; visited); Espressif office (China / Shanghai; visited); Nearby mall (China / Shanghai; visited); Beef-noodle restaurant (China / Shanghai; visited); Maimai / IIDX / ongeki / jubeat arcades (China / Shanghai; visited); Tianzifang (China / Shanghai; visited); Bus route (China / Shanghai; visited); Hotel (China / Shanghai; visited).
- Cover: source post 10677.
- Grouping notes: Calendar July 23 names awarding ceremony, Espressif lunch, arcade and Tianzifang. This separates them from the July 24 upload-day group without changing text or original timestamps.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-23-shanghai-ceremony-and-espressif/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10617 - 2026-07-24-gonna-skip-poster-ceremony/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-gonna-skip-poster-ceremony/index.md>) (messages 10617, 10618, 10619, 10620, 10621, 10622, 10623, 10624, 10625, 10626, 10627, 10628, 10629, 10630, 10631, 10632, 10633, 10634, 10635, 10636, 10637, 10638, 10639, 10640, 10641, 10642, 10643, 10644, 10645, 10646).
  - [Post 10647 - 2026-07-24-went-walk-2nd-prize/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-went-walk-2nd-prize/index.md>) (messages 10647, 10648, 10649, 10650, 10651, 10652, 10653, 10654, 10655, 10656).
  - [Post 10657 - 2026-07-24-other-posters-lmao/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-other-posters-lmao/index.md>) (messages 10657, 10658, 10659, 10660, 10661, 10662, 10663, 10664, 10665, 10666, 10667, 10668, 10669, 10670, 10671, 10672, 10673, 10674, 10675, 10676).
  - [Post 10677 - 2026-07-24-one-things-definitely-wanted/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-one-things-definitely-wanted/index.md>) (messages 10677, 10678, 10679, 10680, 10681, 10682, 10683, 10684, 10685, 10686).
  - [Post 10687 - 2026-07-24-went-back-arcade/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-went-back-arcade/index.md>) (messages 10687, 10688, 10689, 10690, 10691, 10692, 10693, 10694, 10695, 10696).
  - [Post 10697 - 2026-07-24-back-tianzifang-lol-time/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-back-tianzifang-lol-time/index.md>) (messages 10697, 10698, 10699, 10700, 10701, 10702, 10703, 10704, 10705, 10706).
  - [Post 10707 - 2026-07-24-went-back-arcade-played/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-went-back-arcade-played/index.md>) (messages 10707, 10708, 10709, 10710, 10711, 10712, 10713, 10714, 10715, 10716).
  - [Post 10717 - 2026-07-24-took-bus-back-hotel/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-took-bus-back-hotel/index.md>) (messages 10717, 10718, 10719, 10720, 10721, 10722, 10723, 10724, 10725, 10726).

Review flags:

- Post 10617: **missing-media** - 9 unavailable attachments
- Post 10677: **missing-media** - 4 unavailable attachments
- Post 10687: **missing-media** - 2 unavailable attachments
- Post 10697: **missing-media** - 2 unavailable attachments
- Post 10707: **missing-media** - 1 unavailable attachments
- Post 10717: **missing-media** - 2 unavailable attachments

### 16. Shanghai final city day

[src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-24-shanghai-final-city-day/index.md](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-24-shanghai-final-city-day/index.md>)

- Website route: `/tervels/posts/china/shanghai/2026-07-went-back-yu-garden/`
- Article timestamp: `2026-07-24T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Shanghai is a placeholder because actual visit time is unknown.
- Locations: Shanghai (China / Shanghai; visited); Hotel (China / Shanghai; visited); ICBC branch (China / Shanghai; visited); Espressif lunch venue (China / Shanghai; visited); Joy City (China / Shanghai; calendar) - Joy City (calendar clue; anime-mall match tentative); Anime event / shops (China / Shanghai; visited); Animate Cafe (China / Shanghai; visited); Woodworking workshop (China / Shanghai; visited); Yu Garden (China / Shanghai; visited); Oriental Pearl Tower (China / Shanghai; skipped) - Oriental Pearl Tower (considered, not visited); Unnamed ancient town (China / Shanghai; skipped) - Unnamed ancient town (considered, not visited).
- Cover: source post 10757.
- Grouping notes: Calendar July 24 names Espressif lunch, Joy City and Yu Garden. Joy City is a candidate for the unnamed anime mall; 10756 photo association still needs review. Do not mark Oriental Pearl Tower visited: Telegram explicitly says it was skipped.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-24-shanghai-final-city-day/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10727 - 2026-07-24-hotel-breakfast-checkout/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-hotel-breakfast-checkout/index.md>) (messages 10727, 10728, 10729, 10730, 10731, 10732, 10733, 10734, 10735, 10736).
  - [Post 10737 - 2026-07-24-settled-bank-card-apparently/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-settled-bank-card-apparently/index.md>) (messages 10737).
  - [Post 10738 - 2026-07-24-went-back-eat-more/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-went-back-eat-more/index.md>) (messages 10738, 10739, 10740, 10741, 10742, 10743, 10744, 10745).
  - [Post 10746 - 2026-07-24-there-some-poster-about/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-there-some-poster-about/index.md>) (messages 10746, 10747, 10748, 10749, 10750, 10751, 10752, 10753, 10754, 10755).
  - [Post 10756 - 2026-07-24-untitled-10756/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-untitled-10756/index.md>) (messages 10756).
  - [Post 10757 - 2026-07-24-went-back-yu-garden/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-went-back-yu-garden/index.md>) (messages 10757, 10758, 10759, 10760, 10761, 10762, 10763, 10764, 10765, 10766).
  - [Post 10767 - 2026-07-24-then-now-m-having/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-then-now-m-having/index.md>) (messages 10767).

Review flags:

- Post 10727: **missing-media** - 5 unavailable attachments
- Post 10737: **no-photo** - No exported photo for this post
- Post 10756: **needs-context** - Captionless media/location batch: attachment needs review
- Post 10767: **no-photo** - No exported photo for this post

### 17. Shanghai departure

[src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-25-shanghai-departure/index.md](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-25-shanghai-departure/index.md>)

- Website route: `/tervels/posts/china/shanghai/2026-07-anyway-besides-being-depressed/`
- Article timestamp: `2026-07-25T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Shanghai is a placeholder because actual visit time is unknown.
- Locations: Shanghai (China / Shanghai; visited); Shanghai airport (China / Shanghai; visited) - Shanghai airport (unidentified).
- Cover: source post 10768.
- Grouping notes: Retain July 25 airport caption as departure. Calendar July 25 contains Singapore laptop/SSD activities, so departure/arrival remain tied to source travel context rather than an invented sightseeing day.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/intel-embedded-cup-shanghai/2026-07-25-shanghai-departure/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10768 - 2026-07-24-anyway-besides-being-depressed/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-anyway-besides-being-depressed/index.md>) (messages 10768, 10769, 10770).

### 18. Singapore return from Shanghai

[src/content/posts/2026/singapore-local-return-period/2026-07-25-back-in-sg/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-07-25-back-in-sg/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-food-good-re-back/`
- Article timestamp: `2026-07-25T07:08:00+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Shanghai departure airport (China / Shanghai; mentioned) - Shanghai departure airport (context); Flight to Singapore (Singapore / Singapore; visited); Singapore arrival airport (Singapore / Singapore; visited).
- Cover: source post 10771.
- Grouping notes: 10771 begins with photos before the caption at 10778; check whether prefix photos belong to Shanghai airport. Administrative plans retained but optional exclusion.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-07-25-back-in-sg/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10771 - 2026-07-24-food-good-re-back/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-24-food-good-re-back/index.md>) (messages 10771, 10772, 10773, 10774, 10775, 10776, 10777, 10778, 10779, 10780, 10781, 10782, 10783).
  - [Post 10784 - 2026-07-25-ok-so-have-5/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-25-ok-so-have-5/index.md>) (messages 10784).

Review flags:

- Post 10771: **missing-media** - 7 unavailable attachments
- Post 10784: **no-photo** - No exported photo for this post

### 19. Singapore Science Centre outing

[src/content/posts/2026/singapore-local-return-period/2026-07-26-science-centre-outing/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-07-26-science-centre-outing/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-science-centre-gonna-close/`
- Article timestamp: `2026-07-26T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Singapore is a placeholder because actual visit time is unknown.
- Locations: Singapore (Singapore / Singapore; visited); Science Centre Singapore (Singapore / Singapore; visited); Omurice restaurant (Singapore / Singapore; visited) - Omurice restaurant (unidentified).
- Cover: source post 10785.
- Grouping notes: Calendar Science Centre is July 26, not July 28 upload day. Omurice post is a tentative same-outing attachment. Top week July 20-26 inferred from column alignment.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-07-26-science-centre-outing/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10785 - 2026-07-28-science-centre-gonna-close/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-28-science-centre-gonna-close/index.md>) (messages 10785, 10786, 10787, 10788, 10789, 10790, 10791, 10792, 10793, 10794).
  - [Post 10795 - 2026-07-28-oh-omu-rice-thingy/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-28-oh-omu-rice-thingy/index.md>) (messages 10795, 10796, 10797, 10798, 10799, 10800, 10801, 10802, 10803, 10804).

Review flags:

- Post 10785: **missing-media** - 9 unavailable attachments
- Post 10795: **missing-media** - 9 unavailable attachments

### 20. Singapore professional outing

[src/content/posts/2026/singapore-local-return-period/2026-07-29-jump-trading-outing/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-07-29-jump-trading-outing/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-professional-larping-session/`
- Article timestamp: `2026-07-29T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Singapore is a placeholder because actual visit time is unknown.
- Locations: Singapore (Singapore / Singapore; visited); Professional event venue (Singapore / Singapore; visited) - Professional event venue (unidentified); Jump Trading (Singapore / Singapore; visited) - Jump Trading (calendar event/venue clue).
- Cover: source post 10805.
- Grouping notes: Calendar July 29 names Collect Boards, Jump Trading and Walk Around. Professional-larping caption matches this context; exact event venue needs confirmation.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-07-29-jump-trading-outing/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10805 - 2026-07-29-professional-larping-session/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-29-professional-larping-session/index.md>) (messages 10805, 10806, 10807, 10808, 10809, 10810, 10811).

### 21. Japan Expo haul overlap

[src/content/posts/2026/exchange-15-japan-expo-paris/2026-07-29-japan-expo-paris-haul/index.md](<../src/content/posts/2026/exchange-15-japan-expo-paris/2026-07-29-japan-expo-paris-haul/index.md>)

- Website route: `/tervels/posts/france/villepinte/2026-07-japan-expo-paris-haul/`
- Article timestamp: `2026-07-29T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Singapore is a placeholder because actual visit time is unknown.
- Locations: Japan Expo Paris / Parc des Expositions Paris Nord Villepinte (Unknown / Unknown; retrospective) - Japan Expo Paris / Parc des Expositions Paris Nord Villepinte (retrospective).
- Cover: source post 10812.
- Grouping notes: Existing article lists these purchases with edited formatting. Propose cover/provenance addition after review; avoid duplicate article or automatic replacement. July 30 +08:00 is upload time, not event date. Existing article body retained exactly; only cover and source provenance added.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/exchange-15-japan-expo-paris/2026-07-29-japan-expo-paris-haul/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10812 - 2026-07-29-japan-expo-paris-haul/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-29-japan-expo-paris-haul/index.md>) (messages 10812, 10813).

### 22. Singapore outbound flight

[src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-outbound-flight/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-outbound-flight/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-07-start-very-long-journey/`
- Article timestamp: `2026-07-30T17:43:37+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Singapore departure airport (Singapore / Singapore; visited); Flight to Ho Chi Minh City (Singapore / Singapore; visited).
- Cover: source post 10815.
- Grouping notes: Airport/flight identities need confirmation. Forwarded 10815 retained.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-outbound-flight/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10815 - 2026-07-30-start-very-long-journey/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-30-start-very-long-journey/index.md>) (messages 10815).
  - [Post 10816 - 2026-07-30-wasn-t-expecting-food/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-30-wasn-t-expecting-food/index.md>) (messages 10816, 10817, 10818, 10819, 10820).

Review flags:

- Post 10815: **forwarded** - Forwarded source retained; check attribution/context

### 23. Ho Chi Minh City arrival and evening

[src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-ho-chi-minh-arrival-and-evening/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-ho-chi-minh-arrival-and-evening/index.md>)

- Website route: `/tervels/posts/vietnam/ho-chi-minh-city/2026-07-spent/`
- Article timestamp: `2026-07-30T20:40:52+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Ho Chi Minh City (Vietnam / Ho Chi Minh City; visited); Arrival airport (Vietnam / Ho Chi Minh City; visited) - Arrival airport (unidentified); Bui Vien (Vietnam / Ho Chi Minh City; visited).
- Cover: source post 10821.
- Grouping notes: Bui Vien 8.30pm outing was posted next morning. Attachment to arrival evening is provisional; source timestamp remains unchanged.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-30-ho-chi-minh-arrival-and-evening/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10821 - 2026-07-30-spent/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-30-spent/index.md>) (messages 10821, 10822, 10823, 10824, 10825, 10826, 10827, 10828, 10829, 10830).
  - [Post 10831 - 2026-07-31-like-8-30pm-idk/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-31-like-8-30pm-idk/index.md>) (messages 10831, 10832, 10833, 10834, 10835, 10836, 10837, 10838, 10839, 10840).

Review flags:

- Post 10821: **missing-media** - 8 unavailable attachments
- Post 10831: **missing-media** - 4 unavailable attachments

### 24. Ho Chi Minh City breakfast

[src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-banh-mi/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-banh-mi/index.md>)

- Website route: `/tervels/posts/vietnam/ho-chi-minh-city/2026-07-banh-mi/`
- Article timestamp: `2026-07-31T10:24:37+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Ho Chi Minh City (Vietnam / Ho Chi Minh City; visited); Banh Mi shop (Vietnam / Ho Chi Minh City; visited) - Banh Mi shop (unidentified).
- Cover: source post 10842.
- Grouping notes: 
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-banh-mi/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10842 - 2026-07-31-banh-mi/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-31-banh-mi/index.md>) (messages 10842, 10843, 10844, 10845, 10846, 10847, 10848, 10849, 10850).

Review flags:

- Post 10842: **missing-media** - 4 unavailable attachments

### 25. Transit to Brisbane

[src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-transit-to-brisbane/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-transit-to-brisbane/index.md>)

- Website route: `/tervels/posts/australia/brisbane/2026-07-ok-next-stop/`
- Article timestamp: `2026-07-31T11:15:02+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Brisbane (Australia / Brisbane; visited); Transit airports (Australia / Brisbane; visited) - Transit airports (unidentified); Flight to Brisbane (Australia / Brisbane; visited).
- Cover: source post 10851.
- Grouping notes: Includes August 1 food upload. Thai Fried Rice does not establish a Thai city/airport.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-07-31-transit-to-brisbane/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10851 - 2026-07-31-ok-next-stop/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-31-ok-next-stop/index.md>) (messages 10851).
  - [Post 10852 - 2026-07-31-wow-legroom/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-07-31-wow-legroom/index.md>) (messages 10852).
  - [Post 10854 - 2026-08-01-anyway-thai-fried-rice/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-01-anyway-thai-fried-rice/index.md>) (messages 10854, 10855, 10856, 10857).

Review flags:

- Post 10854: **missing-media** - 2 unavailable attachments

### 26. Brisbane arrival and city day

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-01-brisbane-arrival-and-city/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-01-brisbane-arrival-and-city/index.md>)

- Website route: `/tervels/posts/australia/brisbane/2026-08-brisbane/`
- Article timestamp: `2026-08-01T12:00:00+10:00`; Visit date follows approved plan/calendar; noon in Australia/Brisbane is a placeholder because actual visit time is unknown.
- Locations: Brisbane (Australia / Brisbane; visited); Kelvin Grove Market (Australia / Brisbane; visited); Seoul Steals (South Korea / Seoul; visited) - Seoul Steals (vendor name; confirm); Kelvin Grove Library at QUT (Australia / Brisbane; visited); Botanic gardens (Australia / Brisbane; visited) - Botanic gardens (which garden unknown); Brisbane River (Australia / Brisbane; visited); Bridge (Australia / Brisbane; visited); Friendship stones (Australia / Brisbane; visited); Nepalese Pagoda (Australia / Brisbane; visited); South Bank (Australia / Brisbane; visited); Skydeck (Australia / Brisbane; visited); Mall (Australia / Brisbane; visited); Braised chicken restaurant (Australia / Brisbane; visited).
- Cover: source post 10895.
- Grouping notes: Calendar August 1 places Kelvin Grove, South Bank and Sky Lift on this day. Combine arrival and those matching posts, retaining their August 3 upload times in staging.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-01-brisbane-arrival-and-city/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10864 - 2026-08-01-brisbane/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-01-brisbane/index.md>) (messages 10864, 10865, 10866, 10867, 10868, 10869, 10870, 10871, 10872, 10873).
  - [Post 10875 - 2026-08-02-kelvin-grove-market/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-02-kelvin-grove-market/index.md>) (messages 10875, 10876, 10877, 10878, 10879, 10880, 10881, 10882, 10883, 10884).
  - [Post 10885 - 2026-08-02-got-some-loaded-chips/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-02-got-some-loaded-chips/index.md>) (messages 10885, 10886, 10887, 10888, 10889, 10890, 10891, 10892, 10893, 10894).
  - [Post 10895 - 2026-08-03-brisbane/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-brisbane/index.md>) (messages 10895, 10896, 10897, 10898, 10899, 10900, 10901, 10902, 10903, 10904).

Review flags:

- Post 10864: **missing-media** - 8 unavailable attachments
- Post 10875: **missing-media** - 7 unavailable attachments
- Post 10885: **missing-media** - 4 unavailable attachments
- Post 10895: **missing-media** - 1 unavailable attachments

### 27. Review standalone 10874

[src/content/posts/2026/_unsorted/2026-08-02-updates-coming-later-than-usual-got-10874/index.md](<../src/content/posts/2026/_unsorted/2026-08-02-updates-coming-later-than-usual-got-10874/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-updates-coming-later-than/`
- Article timestamp: `2026-08-02T08:02:03+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: none.
- Grouping notes: Posting-status / badge-news update
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-02-updates-coming-later-than-usual-got-10874/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10874 - 2026-08-02-updates-coming-later-than/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-02-updates-coming-later-than/index.md>) (messages 10874).

Review flags:

- Post 10874: **suggest-exclude** - Posting-status / badge-news update
- Post 10874: **no-photo** - No exported photo for this post

### 28. Brisbane museums and galleries

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-02-brisbane-museums-and-galleries/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-02-brisbane-museums-and-galleries/index.md>)

- Website route: `/tervels/posts/australia/brisbane/2026-08-queensland-museum/`
- Article timestamp: `2026-08-02T12:00:00+10:00`; Visit date follows approved plan/calendar; noon in Australia/Brisbane is a placeholder because actual visit time is unknown.
- Locations: Brisbane (Australia / Brisbane; visited); Brisbane City Hall (Australia / Brisbane; visited); Museum of Brisbane (Australia / Brisbane; visited); Queensland Museum (Australia / Brisbane; visited); Queensland Art Gallery (Australia / Brisbane; visited); Queensland Gallery of Modern Art (Australia / Brisbane; visited); Skydeck (Australia / Brisbane; visited); Cream-donut shop (Australia / Brisbane; visited); Ramen restaurant (Australia / Brisbane; visited); Pancake shop (Australia / Brisbane; skipped) - Pancake shop (not eaten at); Acai shop (Australia / Brisbane; mentioned) - Acai shop (visit status unclear); Korean army-stew restaurant (Australia / Brisbane; visited); Palais de Rumine, Lausanne (Switzerland / Lausanne; comparison) - Palais de Rumine, Lausanne (comparison).
- Cover: source post 10958.
- Grouping notes: Calendar August 2 names Museum of Brisbane, Queensland Museum and Queensland Art. Sunday city-hall event also matches August 2. Food and repeat Skydeck captions are same-episode attachments that still need review.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-02-brisbane-museums-and-galleries/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10907 - 2026-08-03-australia-has-will-always/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-australia-has-will-always/index.md>) (messages 10907, 10908, 10909, 10910, 10911, 10912, 10913, 10914, 10915, 10916).
  - [Post 10917 - 2026-08-03-museum-brisbane/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-museum-brisbane/index.md>) (messages 10917, 10918, 10919, 10920, 10921, 10922, 10923, 10924, 10925, 10926).
  - [Post 10927 - 2026-08-03-lot-things-around-brisbane/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-lot-things-around-brisbane/index.md>) (messages 10927, 10928, 10929, 10930, 10931, 10932, 10933, 10934, 10935, 10936).
  - [Post 10949 - 2026-08-03-lunch/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-lunch/index.md>) (messages 10949, 10950, 10951, 10952, 10953, 10954, 10955, 10956, 10957).
  - [Post 10958 - 2026-08-03-queensland-museum/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-queensland-museum/index.md>) (messages 10958, 10959, 10960, 10961, 10962, 10963, 10964, 10965, 10966, 10967).
  - [Post 10968 - 2026-08-04-other-things-museum/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-other-things-museum/index.md>) (messages 10968, 10969, 10970, 10971, 10972, 10973, 10974, 10975, 10976, 10977).
  - [Post 10978 - 2026-08-04-queensland-art-gallery/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-queensland-art-gallery/index.md>) (messages 10978, 10979, 10980, 10981, 10982, 10983, 10984, 10985, 10986, 10987).
  - [Post 10988 - 2026-08-04-queensland-gallery-modern-art/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-queensland-gallery-modern-art/index.md>) (messages 10988, 10989, 10990, 10991, 10992, 10993, 10994, 10995, 10996, 10997).
  - [Post 10998 - 2026-08-04-went-back-skydeck-see/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-went-back-skydeck-see/index.md>) (messages 10998, 10999, 11000, 11001, 11002, 11003, 11004, 11005, 11006, 11007).
  - [Post 11008 - 2026-08-04-recommended-korean-army-stew/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-recommended-korean-army-stew/index.md>) (messages 11008, 11009, 11010, 11011, 11012, 11013, 11014).

Review flags:

- Post 10949: **missing-media** - 3 unavailable attachments
- Post 10968: **missing-media** - 1 unavailable attachments
- Post 10988: **missing-media** - 1 unavailable attachments
- Post 11008: **missing-media** - 3 unavailable attachments

### 29. Gold Coast conservation and city outing

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-03-gold-coast-coombabah-and-surfers-paradise/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-03-gold-coast-coombabah-and-surfers-paradise/index.md>)

- Website route: `/tervels/posts/australia/gold-coast/2026-08-gold-coast/`
- Article timestamp: `2026-08-03T12:00:00+10:00`; Visit date follows approved plan/calendar; noon in Australia/Brisbane is a placeholder because actual visit time is unknown.
- Locations: Gold Coast (Australia / Gold Coast; visited); Coombabah Lakelands Conservation Area (Australia / Gold Coast; visited); Coombabah Lakelands Conservation Area - shared location (Australia / Gold Coast; visited); Coombabah Lakelands Conservation Area - shared location (Australia / Gold Coast; visited); Surfers Paradise (Australia / Gold Coast; calendar) - Surfers Paradise (calendar); Beach (Australia / Gold Coast; visited); KFC (Australia / Gold Coast; visited) - KFC (branch unknown); Timezone (Australia / Gold Coast; visited) - Timezone (calendar arcade clue); Waffle restaurant (Australia / Gold Coast; visited).
- Cover: source post 11029.
- Grouping notes: Calendar August 3 combines Conservation, Surfer's Paradise and Timezone in Gold Coast. Cover 11019 visibly reads Coombabah Lakelands Conservation Area, so move that orphan from beach group to conservation evidence. 10937 attachment and arcade/food branches still need review. Preserve both GPS stops.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-03-gold-coast-coombabah-and-surfers-paradise/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 10937 - 2026-08-03-untitled-10937/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-untitled-10937/index.md>) (messages 10937, 10938, 10939, 10940, 10941, 10942, 10943, 10944, 10945, 10946).
  - [Post 10947 - 2026-08-03-untitled-10947/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-untitled-10947/index.md>) (messages 10947).
  - [Post 10948 - 2026-08-03-https-maps-app-goo/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-03-https-maps-app-goo/index.md>) (messages 10948).
  - [Post 11015 - 2026-08-04-anyway-locations-posted-koalas/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-anyway-locations-posted-koalas/index.md>) (messages 11015, 11016).
  - [Post 11019 - 2026-08-04-untitled-11019/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-untitled-11019/index.md>) (messages 11019, 11020, 11021, 11022, 11023, 11024, 11025, 11026, 11027, 11028).
  - [Post 11029 - 2026-08-05-gold-coast/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-05-gold-coast/index.md>) (messages 11029, 11030, 11031, 11032, 11033, 11034, 11035, 11036, 11037, 11038).
  - [Post 11039 - 2026-08-05-sus-apparently-one-best/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-05-sus-apparently-one-best/index.md>) (messages 11039, 11040, 11041, 11042, 11043, 11044, 11045, 11046, 11047, 11048).

Review flags:

- Post 10937: **needs-context** - Captionless media/location batch: attachment needs review
- Post 10947: **needs-context** - Captionless media/location batch: attachment needs review
- Post 10947: **no-photo** - No exported photo for this post
- Post 10948: **no-photo** - No exported photo for this post
- Post 11019: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11019: **missing-media** - 2 unavailable attachments
- Post 11029: **missing-media** - 1 unavailable attachments
- Post 11039: **missing-media** - 5 unavailable attachments

### 30. Review standalone 11018

[src/content/posts/2026/_unsorted/2026-08-05-side-note-fk-left-10-maibear-11018/index.md](<../src/content/posts/2026/_unsorted/2026-08-05-side-note-fk-left-10-maibear-11018/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-side-note-fk-left/`
- Article timestamp: `2026-08-05T06:36:48+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: none.
- Grouping notes: Lost-badge logistics
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-05-side-note-fk-left-10-maibear-11018/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11018 - 2026-08-04-side-note-fk-left/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-04-side-note-fk-left/index.md>) (messages 11018).

Review flags:

- Post 11018: **suggest-exclude** - Lost-badge logistics
- Post 11018: **no-photo** - No exported photo for this post

### 31. Brisbane university and hike

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-04-brisbane-uq-and-mount-coot-tha/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-04-brisbane-uq-and-mount-coot-tha/index.md>)

- Website route: `/tervels/posts/australia/brisbane/2026-08-went-mt-coot-tha/`
- Article timestamp: `2026-08-04T12:00:00+10:00`; Visit date follows approved plan/calendar; noon in Australia/Brisbane is a placeholder because actual visit time is unknown.
- Locations: Brisbane (Australia / Brisbane; visited); Mount Coot-tha (Australia / Brisbane; visited); University of Queensland (Australia / Brisbane; visited); UQ lake and sandstone buildings (Australia / Brisbane; visited); UQ engineering campus (Australia / Brisbane; visited); UQ cyber area (Australia / Brisbane; visited); Maimai arcade (Australia / Brisbane; visited); Dinner restaurant (Australia / Brisbane; visited).
- Cover: source post 11049.
- Grouping notes: Calendar August 4 names UQ Lecture, Mt Coot-tha and maimai. August 6 UQ caption explicitly precedes hike. Keep all bodies/source timestamps unchanged.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-04-brisbane-uq-and-mount-coot-tha/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11049 - 2026-08-05-went-mt-coot-tha/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-05-went-mt-coot-tha/index.md>) (messages 11049, 11050, 11051, 11052, 11053, 11054, 11055, 11056, 11057, 11058).
  - [Post 11059 - 2026-08-05-maimai-more-dinner/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-05-maimai-more-dinner/index.md>) (messages 11059, 11060, 11061).
  - [Post 11085 - 2026-08-05-oh-before-mt-coot-tha/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-05-oh-before-mt-coot-tha/index.md>) (messages 11085, 11086, 11087, 11088, 11089, 11090, 11091, 11092, 11093, 11094).

### 32. Vancouver layover

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-vancouver-layover/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-vancouver-layover/index.md>)

- Website route: `/tervels/posts/canada/vancouver/2026-08-vancouver/`
- Article timestamp: `2026-08-05T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Vancouver is a placeholder because actual visit time is unknown.
- Locations: Vancouver (Canada / Vancouver; visited); Stanley Park (Canada / Vancouver; visited); eSpot (Canada / Vancouver; skipped) - eSpot (closed / not visited); Canada Place (Canada / Vancouver; visited); Tim Hortons? (Canada / Vancouver; visited) - Tim Hortons? (source: Tom Hortons; branch unknown).
- Cover: source post 11112.
- Grouping notes: Calendar August 5 shows Stanley Park between the Vancouver and Vegas flights; use this visit date instead of August 6/7 +08:00 upload days.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-vancouver-layover/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11084 - 2026-08-05-quick-what-good-recommendations/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-05-quick-what-good-recommendations/index.md>) (messages 11084).
  - [Post 11112 - 2026-08-06-vancouver/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-06-vancouver/index.md>) (messages 11112, 11113, 11114, 11115, 11116, 11117, 11118, 11119, 11120, 11121).

Review flags:

- Post 11084: **no-photo** - No exported photo for this post
- Post 11112: **missing-media** - 3 unavailable attachments

### 33. Las Vegas arrival

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-las-vegas-arrival/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-las-vegas-arrival/index.md>)

- Website route: `/tervels/posts/united-states/las-vegas/2026-08-spl-bbq/`
- Article timestamp: `2026-08-05T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Las Vegas (United States / Las Vegas; visited); Las Vegas arrival airport (United States / Las Vegas; visited); SPL BBQ venue (United States / Las Vegas; visited); Vancouver (Canada / Vancouver; retrospective) - Vancouver (recap reference).
- Cover: source post 11132.
- Grouping notes: Calendar August 5 shows Vancouver transit followed by flight to Vegas. Match flight and arrival BBQ to that leg; recap announcement spans Vancouver/Vegas and remains intact.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-las-vegas-arrival/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11095 - 2026-08-06-bit-delayed-posting-vancouver/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-06-bit-delayed-posting-vancouver/index.md>) (messages 11095).
  - [Post 11122 - 2026-08-06-vegas-flight/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-06-vegas-flight/index.md>) (messages 11122, 11123, 11124, 11125, 11126, 11127, 11128, 11129, 11130, 11131).
  - [Post 11132 - 2026-08-06-spl-bbq/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-06-spl-bbq/index.md>) (messages 11132, 11133, 11134, 11135, 11136, 11137, 11138, 11139, 11140, 11141).

Review flags:

- Post 11095: **no-photo** - No exported photo for this post
- Post 11132: **missing-media** - 6 unavailable attachments

### 34. Brisbane reflections

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-goodbye-brisbane/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-goodbye-brisbane/index.md>)

- Website route: `/tervels/posts/australia/brisbane/2026-08-ok-goodbye-brisbane/`
- Article timestamp: `2026-08-05T12:00:00+10:00`; Visit date follows approved plan/calendar; noon in Australia/Brisbane is a placeholder because actual visit time is unknown.
- Locations: Brisbane (Australia / Brisbane; retrospective).
- Cover: source post 11096.
- Grouping notes: Calendar departure toward Vancouver is August 5. This is a delayed retrospective goodbye caption, not evidence of returning to Brisbane.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-05-goodbye-brisbane/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11096 - 2026-08-06-ok-goodbye-brisbane/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-06-ok-goodbye-brisbane/index.md>) (messages 11096, 11097, 11098, 11099, 11100, 11101, 11102, 11103, 11104, 11105).

Review flags:

- Post 11096: **missing-media** - 1 unavailable attachments

### 35. Review standalone 11106

[src/content/posts/2026/_unsorted/2026-08-06-movies-watched-11106/index.md](<../src/content/posts/2026/_unsorted/2026-08-06-movies-watched-11106/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-movies-watched/`
- Article timestamp: `2026-08-06T22:39:28+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: none.
- Grouping notes: In-flight movie list rather than a location outing
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-06-movies-watched-11106/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11106 - 2026-08-06-movies-watched/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-06-movies-watched/index.md>) (messages 11106).

Review flags:

- Post 11106: **suggest-exclude** - In-flight movie list rather than a location outing
- Post 11106: **no-photo** - No exported photo for this post

### 36. Review standalone 11107

[src/content/posts/2026/_unsorted/2026-08-06-quick-who-wants-merch-have-like-11107/index.md](<../src/content/posts/2026/_unsorted/2026-08-06-quick-who-wants-merch-have-like-11107/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-quick-who-wants-merch/`
- Article timestamp: `2026-08-06T23:18:15+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: source post 11107.
- Grouping notes: Time-sensitive merch request
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-06-quick-who-wants-merch-have-like-11107/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11107 - 2026-08-06-quick-who-wants-merch/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-06-quick-who-wants-merch/index.md>) (messages 11107, 11108, 11109, 11110, 11111).

Review flags:

- Post 11107: **suggest-exclude** - Time-sensitive merch request
- Post 11107: **forwarded** - Forwarded source retained; check attribution/context

### 37. Las Vegas LineCon and outings

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-06-linecon-costco-and-dinner/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-06-linecon-costco-and-dinner/index.md>)

- Website route: `/tervels/posts/united-states/las-vegas/2026-08-so-linecon/`
- Article timestamp: `2026-08-06T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Las Vegas (United States / Las Vegas; visited); LineCon / DEF CON queue (United States / Las Vegas; visited); Merch queue (United States / Las Vegas; visited); Inhumans (United States / Las Vegas; mentioned) - Inhumans (confirm meaning/venue); Costco (United States / Las Vegas; visited); Hotel (United States / Las Vegas; visited); Nearby Roman-style malls (United States / Las Vegas; visited); HackerOne/TikTok Bug Bounty dinner venue (United States / Las Vegas; visited).
- Cover: source post 11142.
- Grouping notes: Calendar August 6 explicitly names LineCon, Costco and TikTok Dinner. Split these from the first conference-day material.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-06-linecon-costco-and-dinner/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11142 - 2026-08-07-so-linecon/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-07-so-linecon/index.md>) (messages 11142, 11144, 11146, 11147, 11150, 11152, 11153, 11154, 11155, 11156).
  - [Post 11157 - 2026-08-08-costco-greyhats-here/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-08-costco-greyhats-here/index.md>) (messages 11157, 11158, 11159, 11160, 11161, 11162, 11163, 11164).
  - [Post 11165 - 2026-08-08-after-crashing-costco-greyhats/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-08-after-crashing-costco-greyhats/index.md>) (messages 11165, 11166, 11167, 11168, 11169, 11170, 11171, 11172, 11173, 11174).

Review flags:

- Post 11142: **missing-media** - 3 unavailable attachments
- Post 11157: **missing-media** - 1 unavailable attachments
- Post 11165: **missing-media** - 3 unavailable attachments

### 38. DEF CON day 1

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-07-defcon-day-1/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-07-defcon-day-1/index.md>)

- Website route: `/tervels/posts/united-states/las-vegas/2026-08-if-asked-me-if/`
- Article timestamp: `2026-08-07T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Las Vegas (United States / Las Vegas; visited); DEF CON venue (United States / Las Vegas; visited); SAO setup area (United States / Las Vegas; visited); Payment Village (United States / Las Vegas; visited); Badgelife talk venue (United States / Las Vegas; visited); SG dinner restaurant (United States / Las Vegas; visited).
- Cover: source post 11185.
- Grouping notes: Calendar August 7 names SAO Setup, Badgelife Talk and SG Dinner. Move SG dinner out of the previous upload-day Day 2 group. Conference sub-venue identities still need matching.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-07-defcon-day-1/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11175 - 2026-08-08-badge-life-bunch-bunch/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-08-badge-life-bunch-bunch/index.md>) (messages 11175, 11176, 11177, 11178, 11179, 11180, 11181, 11183, 11184).
  - [Post 11185 - 2026-08-08-if-asked-me-if/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-08-if-asked-me-if/index.md>) (messages 11185, 11186).
  - [Post 11187 - 2026-08-08-1st-step-business-programming/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-08-1st-step-business-programming/index.md>) (messages 11187, 11188).
  - [Post 11189 - 2026-08-08-atm-payment-village-badge/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-08-atm-payment-village-badge/index.md>) (messages 11189, 11190, 11191).
  - [Post 11192 - 2026-08-08-did-badgelife-sg-talk/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-08-did-badgelife-sg-talk/index.md>) (messages 11192, 11193, 11194, 11195, 11196, 11197, 11198, 11199).
  - [Post 11217 - 2026-08-09-sg-dinner/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-sg-dinner/index.md>) (messages 11217, 11218, 11219, 11220, 11221, 11222, 11223, 11224, 11225, 11226).

Review flags:

- Post 11175: **missing-media** - 5 unavailable attachments
- Post 11185: **missing-media** - 1 unavailable attachments
- Post 11187: **missing-media** - 2 unavailable attachments
- Post 11187: **no-photo** - No exported photo for this post
- Post 11217: **missing-media** - 2 unavailable attachments

### 39. DEF CON day 2

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-08-defcon-day-2/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-08-defcon-day-2/index.md>)

- Website route: `/tervels/posts/united-states/las-vegas/2026-08-defcon-day-2/`
- Article timestamp: `2026-08-08T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Las Vegas (United States / Las Vegas; visited); DEF CON venue (United States / Las Vegas; visited); Merch area (United States / Las Vegas; visited); Denny's (United States / Las Vegas; visited); Hacker Jeopardy venue (United States / Las Vegas; visited); Gothcon venue (United States / Las Vegas; visited).
- Cover: source post 11231.
- Grouping notes: Calendar August 8 names Dennys and Hacker Jeopardy and matches literal Defcon day 2 caption. Captionless batches remain tentative attachments.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-08-defcon-day-2/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11200 - 2026-08-09-untitled-11200/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-untitled-11200/index.md>) (messages 11200, 11201, 11202, 11203, 11204, 11205, 11206).
  - [Post 11207 - 2026-08-09-untitled-11207/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-untitled-11207/index.md>) (messages 11207).
  - [Post 11208 - 2026-08-09-untitled-11208/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-untitled-11208/index.md>) (messages 11208).
  - [Post 11209 - 2026-08-09-merch/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-merch/index.md>) (messages 11209, 11210, 11211, 11212, 11213, 11214, 11215, 11216).
  - [Post 11227 - 2026-08-09-dennys-breakfast-sponsored-by/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-dennys-breakfast-sponsored-by/index.md>) (messages 11227, 11228, 11229, 11230).
  - [Post 11231 - 2026-08-09-defcon-day-2/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-defcon-day-2/index.md>) (messages 11231, 11232, 11233, 11234, 11235, 11236, 11237, 11238, 11239, 11240).
  - [Post 11241 - 2026-08-09-untitled-11241/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-untitled-11241/index.md>) (messages 11241, 11242, 11243).
  - [Post 11244 - 2026-08-09-listening-hacker-jeopardy-actually/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-09-listening-hacker-jeopardy-actually/index.md>) (messages 11244, 11245, 11246, 11247, 11248, 11249, 11250, 11251, 11252, 11253).

Review flags:

- Post 11200: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11207: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11208: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11227: **missing-media** - 1 unavailable attachments
- Post 11241: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11241: **missing-media** - 3 unavailable attachments
- Post 11241: **no-photo** - No exported photo for this post
- Post 11244: **missing-media** - 7 unavailable attachments

### 40. DEF CON day 3 and farewell

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-09-defcon-day-3-and-farewell/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-09-defcon-day-3-and-farewell/index.md>)

- Website route: `/tervels/posts/united-states/las-vegas/2026-08-left-some-gifts-polygl0ts/`
- Article timestamp: `2026-08-09T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Las Vegas (United States / Las Vegas; visited); DEF CON venue (United States / Las Vegas; visited); Polygl0ts farewell location (United States / Las Vegas; visited).
- Cover: source post 11254.
- Grouping notes: Calendar August 9 is final DEFCON day. Closing media/gifts tentatively belong here. HAM exam, museum volunteering and CTF afterparty are calendar-only clues until matched to the unavailable/uncaptioned media, not invented article text.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-09-defcon-day-3-and-farewell/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11254 - 2026-08-10-untitled-11254/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-10-untitled-11254/index.md>) (messages 11254, 11255, 11256, 11257).
  - [Post 11258 - 2026-08-10-untitled-11258/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-10-untitled-11258/index.md>) (messages 11258, 11259, 11260, 11261, 11262, 11263).
  - [Post 11264 - 2026-08-10-untitled-11264/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-10-untitled-11264/index.md>) (messages 11264, 11265).
  - [Post 11266 - 2026-08-10-left-some-gifts-polygl0ts/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-10-left-some-gifts-polygl0ts/index.md>) (messages 11266).

Review flags:

- Post 11254: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11258: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11258: **missing-media** - 3 unavailable attachments
- Post 11264: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11264: **missing-media** - 2 unavailable attachments
- Post 11264: **no-photo** - No exported photo for this post

### 41. Las Vegas to Seattle flight

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-flight-to-seattle/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-flight-to-seattle/index.md>)

- Website route: `/tervels/posts/united-states/las-vegas/2026-08-got-long-sandwich-bfast/`
- Article timestamp: `2026-08-10T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Las Vegas (United States / Las Vegas; visited); Las Vegas departure airport (United States / Las Vegas; visited); Airport sandwich shop (United States / Las Vegas; visited); Flight to Seattle (United States / Seattle area; visited).
- Cover: source post 11270.
- Grouping notes: Calendar August 10 specifies Flight to Seattle. Match breakfast and possible departure photo here; 11267 still needs visual context review.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-flight-to-seattle/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11267 - 2026-08-10-untitled-11267/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-10-untitled-11267/index.md>) (messages 11267).
  - [Post 11270 - 2026-08-11-got-long-sandwich-bfast/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-11-got-long-sandwich-bfast/index.md>) (messages 11270, 11271, 11272, 11273, 11274).

Review flags:

- Post 11267: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11270: **missing-media** - 2 unavailable attachments

### 42. DEF CON reflections

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-defcon-34-reflections/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-defcon-34-reflections/index.md>)

- Website route: `/tervels/posts/united-states/las-vegas/2026-08-defcon-34-reflections/`
- Article timestamp: `2026-08-10T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Las Vegas (United States / Las Vegas; retrospective); Las Vegas / DEF CON (United States / Las Vegas; retrospective) - Las Vegas / DEF CON (retrospective); Next destination not established in these captions (United States / Las Vegas; visited).
- Cover: source post 11268.
- Grouping notes: Calendar departure from Vegas is August 10; reflection posts fall on August 10 in Pacific time. Keep linked Google Doc as a link, without fetching/summarizing it.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-defcon-34-reflections/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11268 - 2026-08-10-last-leg-best-leg/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-10-last-leg-best-leg/index.md>) (messages 11268).
  - [Post 11269 - 2026-08-10-defcon-34-reflections/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-10-defcon-34-reflections/index.md>) (messages 11269).

Review flags:

- Post 11269: **no-photo** - No exported photo for this post

### 43. Seattle area mall and arcade

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-southcenter-and-round-1/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-southcenter-and-round-1/index.md>)

- Website route: `/tervels/posts/united-states/seattle-area/2026-08-southcenter-mall/`
- Article timestamp: `2026-08-10T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Seattle area (United States / Seattle area; visited); Southcenter Mall (United States / Seattle area; visited) - Southcenter Mall (city verify); Round 1 arcade (United States / Seattle area; visited) - Round 1 arcade (branch verify); Seattle / Tukwila area (United States / Seattle area; mentioned) - Seattle / Tukwila area (contextual).
- Cover: source post 11285.
- Grouping notes: Calendar August 10 names Southcenter Mall and Round 1 after arrival. Captionless arcade batches need attachment review; Crossover episode clip unavailable.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-10-southcenter-and-round-1/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11275 - 2026-08-11-southcenter-mall/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-11-southcenter-mall/index.md>) (messages 11275, 11276, 11277, 11278, 11279, 11280, 11281, 11282, 11283, 11284).
  - [Post 11285 - 2026-08-11-round-1-really-feels/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-11-round-1-really-feels/index.md>) (messages 11285, 11286, 11287, 11288, 11289, 11290, 11291, 11292, 11293, 11294).
  - [Post 11295 - 2026-08-11-untitled-11295/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-11-untitled-11295/index.md>) (messages 11295, 11296, 11297, 11298, 11299, 11300, 11301, 11302, 11303, 11304).
  - [Post 11305 - 2026-08-11-untitled-11305/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-11-untitled-11305/index.md>) (messages 11305, 11306, 11307, 11308, 11309, 11310, 11311, 11312).
  - [Post 11313 - 2026-08-11-untitled-11313/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-11-untitled-11313/index.md>) (messages 11313, 11314).
  - [Post 11315 - 2026-08-11-crossover-episode/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-11-crossover-episode/index.md>) (messages 11315, 11316).

Review flags:

- Post 11275: **missing-media** - 9 unavailable attachments
- Post 11285: **missing-media** - 3 unavailable attachments
- Post 11295: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11295: **missing-media** - 2 unavailable attachments
- Post 11305: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11305: **missing-media** - 2 unavailable attachments
- Post 11313: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11313: **missing-media** - 2 unavailable attachments
- Post 11313: **no-photo** - No exported photo for this post
- Post 11315: **missing-media** - 1 unavailable attachments
- Post 11315: **forwarded** - Forwarded source retained; check attribution/context
- Post 11315: **no-photo** - No exported photo for this post

### 44. Mount Rainier Skyline Trail outing

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-11-mount-rainier-skyline-trail/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-11-mount-rainier-skyline-trail/index.md>)

- Website route: `/tervels/posts/united-states/mount-rainier/2026-08-anyway-mt-rainier-skyline/`
- Article timestamp: `2026-08-11T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Mount Rainier (United States / Mount Rainier; visited); Mount Rainier (United States / Mount Rainier area; visited); Skyline Trail (United States / Mount Rainier area; visited); American diners (United States / Mount Rainier; visited) - American diners (unidentified); Seattle (United States / Seattle; mentioned) - Seattle (context); San Francisco (United States / San Francisco; skipped) - San Francisco (alternative not visited).
- Cover: source post 11326.
- Grouping notes: Calendar August 11 fixes Mt Rainier/Skyline Trail visit day. Keep forwarded diner material in source order; exact diner/day match remains tentative.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-11-mount-rainier-skyline-trail/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11317 - 2026-08-12-lmao-just-forwarding-other/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-12-lmao-just-forwarding-other/index.md>) (messages 11317, 11318, 11319, 11320, 11321, 11322, 11323, 11324).
  - [Post 11325 - 2026-08-12-american-diner-food-celebrate/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-12-american-diner-food-celebrate/index.md>) (messages 11325).
  - [Post 11326 - 2026-08-13-anyway-mt-rainier-skyline/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-13-anyway-mt-rainier-skyline/index.md>) (messages 11326, 11327, 11328, 11329, 11330, 11331, 11332, 11333, 11334, 11335).
  - [Post 11336 - 2026-08-13-random-american-diner-where/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-13-random-american-diner-where/index.md>) (messages 11336, 11337, 11338, 11339, 11340, 11341, 11342).

Review flags:

- Post 11317: **missing-media** - 7 unavailable attachments
- Post 11317: **forwarded** - Forwarded source retained; check attribution/context
- Post 11317: **no-photo** - No exported photo for this post
- Post 11325: **forwarded** - Forwarded source retained; check attribution/context
- Post 11325: **no-photo** - No exported photo for this post

### 45. Mount Rainier lakes and meteor outing

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-12-tipsoo-lake-and-meteor-shower/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-12-tipsoo-lake-and-meteor-shower/index.md>)

- Website route: `/tervels/posts/united-states/mount-rainier-area/2026-08-slept-day-went-out/`
- Article timestamp: `2026-08-12T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Mount Rainier area (United States / Mount Rainier area; visited); Tipsoo Lake (United States / Mount Rainier area; calendar) - Tipsoo Lake (calendar clue; lake/photo match requires review); Lake near Mount Rainier (United States / Mount Rainier area; visited); Nearby town (United States / Mount Rainier area; visited); Pizza restaurant (United States / Mount Rainier area; visited); Ice cream shop (United States / Mount Rainier area; visited); Overnight/car-rest location (United States / Mount Rainier area; visited); Meteor-viewing site (United States / Mount Rainier area; visited).
- Cover: source post 11343.
- Grouping notes: Calendar August 12 names Tipsoo Lake and meteor shower. Use Tipsoo as calendar-supported clue for unnamed lake, keeping exact venue/photo match reviewable. Preserve all original wording.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-12-tipsoo-lake-and-meteor-shower/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11343 - 2026-08-13-slept-day-went-out/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-13-slept-day-went-out/index.md>) (messages 11343, 11344, 11345, 11346, 11347).
  - [Post 11348 - 2026-08-13-went-town-because-lake/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-13-went-town-because-lake/index.md>) (messages 11348, 11349, 11350, 11351, 11352, 11353, 11354).
  - [Post 11355 - 2026-08-13-untitled-11355/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-13-untitled-11355/index.md>) (messages 11355).
  - [Post 11356 - 2026-08-13-btw-also-take-note/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-13-btw-also-take-note/index.md>) (messages 11356).
  - [Post 11357 - 2026-08-14-anyway-after-sleeping-walked/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-14-anyway-after-sleeping-walked/index.md>) (messages 11357, 11358, 11359, 11360, 11361, 11362, 11363, 11364, 11365, 11366).
  - [Post 11367 - 2026-08-14-how-tf-do-capture/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-14-how-tf-do-capture/index.md>) (messages 11367, 11368, 11369, 11370).

Review flags:

- Post 11355: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11355: **missing-media** - 1 unavailable attachments
- Post 11355: **forwarded** - Forwarded source retained; check attribution/context
- Post 11355: **no-photo** - No exported photo for this post
- Post 11356: **no-photo** - No exported photo for this post

### 46. Seattle pit stop and Raising Canes

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-13-road-trip-and-raising-canes/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-13-road-trip-and-raising-canes/index.md>)

- Website route: `/tervels/posts/united-states/washington-road-trip/2026-08-raising-canes/`
- Article timestamp: `2026-08-13T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Washington road trip (United States / Washington road trip; visited); Pit stop (United States / Washington road trip; visited) - Pit stop (unidentified); Raising Cane's (United States / Washington road trip; visited) - Raising Cane's (branch unknown); Seattle-area route (United States / Seattle area; visited) - Seattle-area route (city confirm); I-82 W / US 97 (United States / Washington road trip; visited) - I-82 W / US 97 (visible in road photo); Wallace Falls (United States / Washington road trip; calendar) - Wallace Falls (calendar-only; media match not established); Denny's lunch venue (United States / Washington road trip; calendar) - Denny's lunch venue (calendar-only; match unresolved).
- Cover: source post 11371.
- Grouping notes: Calendar August 13 names Denny's Lunch, Wallace Falls and Raising Canes. Canes matches explicit caption; road photo 11371 shows I-82 W / US 97. Wallace Falls and Denny's are unmatched calendar activities, not invented Telegram content.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-13-road-trip-and-raising-canes/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11371 - 2026-08-14-pit-stop/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-14-pit-stop/index.md>) (messages 11371, 11372, 11373).
  - [Post 11374 - 2026-08-14-raising-canes/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-14-raising-canes/index.md>) (messages 11374, 11375, 11376, 11377, 11378).

Review flags:

- Post 11371: **missing-media** - 1 unavailable attachments
- Post 11371: **forwarded** - Forwarded source retained; check attribution/context
- Post 11374: **missing-media** - 4 unavailable attachments
- Post 11374: **forwarded** - Forwarded source retained; check attribution/context
- Post 11374: **no-photo** - No exported photo for this post

### 47. Seattle waterfront and departure

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-seattle-city-and-airport/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-seattle-city-and-airport/index.md>)

- Website route: `/tervels/posts/united-states/seattle/2026-08-waterfront-ft-korean-fair/`
- Article timestamp: `2026-08-14T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Seattle (United States / Seattle; visited); Seattle waterfront (United States / Seattle area; visited); Korean fair venue (United States / Seattle; visited); Chowder restaurant (United States / Seattle; visited); Seattle airport (United States / Seattle area; visited) - Seattle airport (confirm); Airport art/exhibition areas (United States / Seattle; visited); Space Needle (United States / Seattle; calendar) - Space Needle (calendar clue; media match unresolved); Pike Place (United States / Seattle; calendar) - Pike Place (calendar clue); Apple Shop (United States / Seattle; calendar) - Apple Shop (branch unresolved; calendar clue).
- Cover: source post 11392.
- Grouping notes: Calendar August 14 names Space Needle, Pike Place, Apple Shop and Seattle Airport. Waterfront/chowder/airport captions match the day; exact missing-video associations for calendar stops remain unresolved. In-flight photo batches 11400/11403 moved to separate flight group.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-seattle-city-and-airport/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11380 - 2026-08-15-untitled-11380/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-untitled-11380/index.md>) (messages 11380, 11381, 11382, 11383, 11384).
  - [Post 11385 - 2026-08-15-waterfront-ft-korean-fair/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-waterfront-ft-korean-fair/index.md>) (messages 11385, 11386, 11387).
  - [Post 11388 - 2026-08-15-apparently-best-chowder-ever/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-apparently-best-chowder-ever/index.md>) (messages 11388, 11389).
  - [Post 11390 - 2026-08-15-man-like-trip-just/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-man-like-trip-just/index.md>) (messages 11390).
  - [Post 11391 - 2026-08-15-untitled-11391/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-untitled-11391/index.md>) (messages 11391).
  - [Post 11392 - 2026-08-15-seattle-airport-really-has/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-seattle-airport-really-has/index.md>) (messages 11392, 11393, 11394, 11395, 11396, 11397, 11398, 11399).
  - [Post 11410 - 2026-08-15-s-really-nearing-end/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-s-really-nearing-end/index.md>) (messages 11410).

Review flags:

- Post 11380: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11380: **missing-media** - 5 unavailable attachments
- Post 11380: **forwarded** - Forwarded source retained; check attribution/context
- Post 11380: **no-photo** - No exported photo for this post
- Post 11385: **missing-media** - 2 unavailable attachments
- Post 11385: **forwarded** - Forwarded source retained; check attribution/context
- Post 11385: **no-photo** - No exported photo for this post
- Post 11388: **missing-media** - 1 unavailable attachments
- Post 11388: **forwarded** - Forwarded source retained; check attribution/context
- Post 11388: **no-photo** - No exported photo for this post
- Post 11390: **no-photo** - No exported photo for this post
- Post 11391: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11391: **missing-media** - 1 unavailable attachments
- Post 11391: **forwarded** - Forwarded source retained; check attribution/context
- Post 11391: **no-photo** - No exported photo for this post
- Post 11392: **missing-media** - 1 unavailable attachments
- Post 11410: **no-photo** - No exported photo for this post

### 48. Seattle to Seoul flight

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-flight-to-seoul/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-flight-to-seoul/index.md>)

- Website route: `/tervels/posts/united-states/seattle/2026-08-food-quite-mid-ngl/`
- Article timestamp: `2026-08-14T12:00:00-07:00`; Visit date follows approved plan/calendar; noon in America/Los_Angeles is a placeholder because actual visit time is unknown.
- Locations: Seattle (United States / Seattle; visited); Seattle airport (United States / Seattle area; visited); Asiana Airlines flight (United States / Seattle; visited); Incheon arrival airport (South Korea / Incheon; visited).
- Cover: source post 11411.
- Grouping notes: Calendar August 14 has Seattle Airport and August 15 has Seoul Transit. Covers 11400/11403 show Asiana in-flight entertainment, so move those batches out of Seattle waterfront and into this flight. Date spans departure August 14 to arrival/transit August 15.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-14-flight-to-seoul/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11400 - 2026-08-15-untitled-11400/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-untitled-11400/index.md>) (messages 11400, 11401, 11402).
  - [Post 11403 - 2026-08-15-untitled-11403/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-untitled-11403/index.md>) (messages 11403, 11404, 11405, 11406, 11407, 11408, 11409).
  - [Post 11411 - 2026-08-15-food-quite-mid-ngl/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-food-quite-mid-ngl/index.md>) (messages 11411, 11412, 11413, 11414).

Review flags:

- Post 11400: **needs-context** - Captionless media/location batch: attachment needs review
- Post 11403: **needs-context** - Captionless media/location batch: attachment needs review

### 49. Seoul layover

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-15-seoul-layover/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-15-seoul-layover/index.md>)

- Website route: `/tervels/posts/south-korea/seoul/2026-08-seoul-station-walking-around/`
- Article timestamp: `2026-08-15T12:00:00+09:00`; Visit date follows approved plan/calendar; noon in Asia/Seoul is a placeholder because actual visit time is unknown.
- Locations: Seoul (South Korea / Seoul; visited); Incheon airport (South Korea / Incheon; visited) - Incheon airport (source: Seoul Icheon; verify); Lotteria (South Korea / Seoul; visited) - Lotteria (branch unknown); Seoul Station (South Korea / Seoul; visited); Myeongdong (South Korea / Seoul; visited); Isaac Toast (South Korea / Seoul; visited) - Isaac Toast (source: Issac Toast; branch unknown); Deoksugung Palace (South Korea / Seoul; visited); Hongdae (South Korea / Seoul; visited); AK Plaza (South Korea / Seoul; visited); Bakudanyaki stall (South Korea / Seoul; visited); Airport bus route (South Korea / Seoul; visited).
- Cover: source post 11436.
- Grouping notes: Calendar August 15 fixes Seoul visit day: Myeongdong, Deoksugung and AK Plaza/Hongdae. Cover 11466 shows Seoul street scene rather than a flight; move this batch into city outing. Preserve August 16/17 upload timestamps in staged files.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-15-seoul-layover/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11415 - 2026-08-15-mid-stop-point/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-mid-stop-point/index.md>) (messages 11415).
  - [Post 11416 - 2026-08-15-been-while-since-had/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-been-while-since-had/index.md>) (messages 11416, 11417, 11418).
  - [Post 11419 - 2026-08-15-wtf-s-raining-seoul/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-15-wtf-s-raining-seoul/index.md>) (messages 11419).
  - [Post 11420 - 2026-08-16-initially-gonna-go-palace/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-16-initially-gonna-go-palace/index.md>) (messages 11420).
  - [Post 11421 - 2026-08-16-seoul-station-walking-around/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-16-seoul-station-walking-around/index.md>) (messages 11421, 11422, 11423, 11424, 11425, 11426, 11427, 11428, 11429, 11430).
  - [Post 11431 - 2026-08-16-issac-toast/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-16-issac-toast/index.md>) (messages 11431, 11432, 11433, 11434, 11435).
  - [Post 11436 - 2026-08-16-deoksugung-palace/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-16-deoksugung-palace/index.md>) (messages 11436, 11437, 11438, 11439, 11440, 11441, 11442, 11443, 11444, 11445, 11446, 11447, 11448, 11449, 11450, 11451, 11452, 11453, 11454, 11455).
  - [Post 11456 - 2026-08-16-back-ak-plaza/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-16-back-ak-plaza/index.md>) (messages 11456, 11457, 11458, 11459, 11460, 11461, 11462, 11463, 11464, 11465).
  - [Post 11466 - 2026-08-17-untitled-11466/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-17-untitled-11466/index.md>) (messages 11466, 11467, 11468, 11469, 11470, 11471, 11472, 11473, 11474, 11475).

Review flags:

- Post 11416: **missing-media** - 2 unavailable attachments
- Post 11419: **no-photo** - No exported photo for this post
- Post 11420: **no-photo** - No exported photo for this post
- Post 11421: **missing-media** - 2 unavailable attachments
- Post 11436: **missing-media** - 1 unavailable attachments
- Post 11466: **needs-context** - Captionless media/location batch: attachment needs review

### 50. Seoul departure and Singapore arrival

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-16-homebound-flight/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-16-homebound-flight/index.md>)

- Website route: `/tervels/posts/south-korea/incheon/2026-08-yeah-almost-missed-flight/`
- Article timestamp: `2026-08-16T12:00:00+09:00`; Visit date follows approved plan/calendar; noon in Asia/Seoul is a placeholder because actual visit time is unknown.
- Locations: Incheon (South Korea / Incheon; visited); Incheon airport (South Korea / Incheon; mentioned) - Incheon airport (contextual); Flight to Singapore (Singapore / Singapore; visited); Singapore arrival airport (Singapore / Singapore; visited).
- Cover: source post 11476.
- Grouping notes: Calendar August 16 specifies Flight to Singapore. Remove Seoul-street photo batch 11466 from this flight group; retain only original flight recap 11476.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-16-homebound-flight/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11476 - 2026-08-17-yeah-almost-missed-flight/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-17-yeah-almost-missed-flight/index.md>) (messages 11476, 11477, 11478, 11479, 11480, 11481, 11482, 11483, 11484).

### 51. Summer travels wrap up

[src/content/posts/2026/brisbane-defcon-seattle/2026-08-17-summer-travels-wrap-up/index.md](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-17-summer-travels-wrap-up/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-08-last-tervel-summer-has/`
- Article timestamp: `2026-08-17T14:20:10+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; retrospective); Brisbane (Australia / Brisbane; retrospective) - Brisbane (retrospective); Las Vegas (United States / Las Vegas; retrospective) - Las Vegas (retrospective); Seattle (United States / Seattle; retrospective) - Seattle (retrospective).
- Cover: none.
- Grouping notes: Keep costs and reflections verbatim.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/brisbane-defcon-seattle/2026-08-17-summer-travels-wrap-up/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11485 - 2026-08-17-last-tervel-summer-has/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-17-last-tervel-summer-has/index.md>) (messages 11485).

Review flags:

- Post 11485: **no-photo** - No exported photo for this post

### 52. Singapore food comparison

[src/content/posts/2026/singapore-local-return-period/2026-08-22-food-comparison/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-08-22-food-comparison/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-08-swiss-can-only-get/`
- Article timestamp: `2026-08-22T09:45:35+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Singapore meal venue (Singapore / Singapore; visited) - Singapore meal venue (unidentified); Switzerland (Switzerland / Unknown; comparison) - Switzerland (comparison).
- Cover: source post 11486.
- Grouping notes: Do not classify as new Swiss visit; identify current photographed venue if possible.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-08-22-food-comparison/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11486 - 2026-08-22-swiss-can-only-get/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-22-swiss-can-only-get/index.md>) (messages 11486, 11487).

### 53. Review standalone 11488

[src/content/posts/2026/_unsorted/2026-08-22-didnt-know-slack-had-more-invitations-11488/index.md](<../src/content/posts/2026/_unsorted/2026-08-22-didnt-know-slack-had-more-invitations-11488/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-didnt-know-slack-had/`
- Article timestamp: `2026-08-22T23:06:47+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: source post 11488.
- Grouping notes: Slack-invitation admin
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-22-didnt-know-slack-had-more-invitations-11488/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11488 - 2026-08-22-didnt-know-slack-had/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-22-didnt-know-slack-had/index.md>) (messages 11488).

Review flags:

- Post 11488: **suggest-exclude** - Slack-invitation admin

### 54. ISITDTU retrospective

[src/content/posts/2026/_unsorted/2026-08-25-isitdtu-retrospective/index.md](<../src/content/posts/2026/_unsorted/2026-08-25-isitdtu-retrospective/index.md>)

- Website route: `/tervels/posts/vietnam/da-nang/2026-08-one-first-tervels-before/`
- Article timestamp: `2026-08-25T15:41:01+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Da Nang (Vietnam / Da Nang; retrospective); ISITDTU CTF / Da Nang (Vietnam / Da Nang; retrospective) - ISITDTU CTF / Da Nang (match existing event metadata).
- Cover: none.
- Grouping notes: Preserve Google Photos link; no external album retrieval at this stage.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-25-isitdtu-retrospective/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11489 - 2026-08-25-https-photos-google-com/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-25-https-photos-google-com/index.md>) (messages 11489).

Review flags:

- Post 11489: **no-photo** - No exported photo for this post

### 55. Review standalone 11490

[src/content/posts/2026/_unsorted/2026-08-25-https-www-reddit-com-r-defcon-11490/index.md](<../src/content/posts/2026/_unsorted/2026-08-25-https-www-reddit-com-r-defcon-11490/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-need-remind-myself-go/`
- Article timestamp: `2026-08-25T21:36:04+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: none.
- Grouping notes: Reminder to inspect a Reddit post
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-25-https-www-reddit-com-r-defcon-11490/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11490 - 2026-08-25-https-www-reddit-com/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-25-https-www-reddit-com/index.md>) (messages 11490).

Review flags:

- Post 11490: **suggest-exclude** - Reminder to inspect a Reddit post
- Post 11490: **no-photo** - No exported photo for this post

### 56. Review standalone 11491

[src/content/posts/2026/_unsorted/2026-08-26-ngl-being-utr-ra-sounds-like-11491/index.md](<../src/content/posts/2026/_unsorted/2026-08-26-ngl-being-utr-ra-sounds-like-11491/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-ngl-being-utr-ra/`
- Article timestamp: `2026-08-26T20:22:07+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: none.
- Grouping notes: RA job commentary
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-26-ngl-being-utr-ra-sounds-like-11491/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11491 - 2026-08-26-ngl-being-utr-ra/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-26-ngl-being-utr-ra/index.md>) (messages 11491).

Review flags:

- Post 11491: **suggest-exclude** - RA job commentary
- Post 11491: **no-photo** - No exported photo for this post

### 57. Review standalone 11492

[src/content/posts/2026/_unsorted/2026-08-27-wonder-when-epfl-mod-mapping-will-11492/index.md](<../src/content/posts/2026/_unsorted/2026-08-27-wonder-when-epfl-mod-mapping-will-11492/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-08-wonder-when-epfl-mod/`
- Article timestamp: `2026-08-27T08:44:54+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: none.
- Grouping notes: Module-mapping admin
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-08-27-wonder-when-epfl-mod-mapping-will-11492/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11492 - 2026-08-27-wonder-when-epfl-mod/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-08-27-wonder-when-epfl-mod/index.md>) (messages 11492).

Review flags:

- Post 11492: **suggest-exclude** - Module-mapping admin
- Post 11492: **no-photo** - No exported photo for this post

### 58. Review standalone 11493

[src/content/posts/2026/_unsorted/2026-09-02-lmao-just-sent-mapping-because-didn-11493/index.md](<../src/content/posts/2026/_unsorted/2026-09-02-lmao-just-sent-mapping-because-didn-11493/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-09-lmao-just-sent-mapping/`
- Article timestamp: `2026-09-02T11:41:52+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: source post 11493.
- Grouping notes: Module-mapping admin
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-09-02-lmao-just-sent-mapping-because-didn-11493/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11493 - 2026-09-02-lmao-just-sent-mapping/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-02-lmao-just-sent-mapping/index.md>) (messages 11493, 11494).

Review flags:

- Post 11493: **suggest-exclude** - Module-mapping admin

### 59. NUSC Makers Market

[src/content/posts/2026/singapore-local-return-period/2026-09-07-nusc-makers-market/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-09-07-nusc-makers-market/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-nusc-makers-market/`
- Article timestamp: `2026-09-07T21:43:42+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); NUSC Makers Market (Singapore / Singapore; visited); NUS College (Singapore / Singapore; visited) - NUS College (specific venue unknown).
- Cover: source post 11495.
- Grouping notes: 
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-09-07-nusc-makers-market/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11495 - 2026-09-07-nusc-makers-market/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-07-nusc-makers-market/index.md>) (messages 11495, 11496, 11497, 11498, 11499).

### 60. Exchange wrap up slides

[src/content/posts/2026/_unsorted/2026-09-07-exchange-wrap-up-slides/index.md](<../src/content/posts/2026/_unsorted/2026-09-07-exchange-wrap-up-slides/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-09-exchange-wrap-up-slides/`
- Article timestamp: `2026-09-07T22:05:37+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Exchange destinations (Unknown / Unknown; visited) - Exchange destinations (not enumerated in caption).
- Cover: source post 11500.
- Grouping notes: Preserve presentation link without fetching, importing or summarizing its contents.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-09-07-exchange-wrap-up-slides/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11500 - 2026-09-07-exchange-wrap-up-slides/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-07-exchange-wrap-up-slides/index.md>) (messages 11500).

### 61. Review standalone 11501

[src/content/posts/2026/_unsorted/2026-09-09-shanghai-trip-claim-11501/index.md](<../src/content/posts/2026/_unsorted/2026-09-09-shanghai-trip-claim-11501/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-09-shanghai-trip-claim/`
- Article timestamp: `2026-09-09T00:53:57+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: source post 11501.
- Grouping notes: Travel-claim admin
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-09-09-shanghai-trip-claim-11501/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11501 - 2026-09-08-shanghai-trip-claim/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-08-shanghai-trip-claim/index.md>) (messages 11501).

Review flags:

- Post 11501: **suggest-exclude** - Travel-claim admin

### 62. Review standalone 11502

[src/content/posts/2026/_unsorted/2026-09-09-gg-11502/index.md](<../src/content/posts/2026/_unsorted/2026-09-09-gg-11502/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-09-gg/`
- Article timestamp: `2026-09-09T15:18:03+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Unresolved (Unknown / Unknown; mentioned) - Unresolved; inspect caption/photo if relevant.
- Cover: source post 11502.
- Grouping notes: Brief screenshot update without identified place
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-09-09-gg-11502/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11502 - 2026-09-09-gg/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-09-gg/index.md>) (messages 11502).

Review flags:

- Post 11502: **suggest-exclude** - Brief screenshot update without identified place

### 63. Off By One 2026

[src/content/posts/2026/singapore-local-return-period/2026-09-15-off-by-one-2026/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-09-15-off-by-one-2026/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-off-by-one-2026/`
- Article timestamp: `2026-09-15T12:27:29+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Off By One 2026 venue (Singapore / Singapore; visited); DEF CON 34 (United States / Las Vegas; comparison) - DEF CON 34 (comparison); Hardware challenge / booth areas (Singapore / Singapore; visited).
- Cover: source post 11503.
- Grouping notes: Substantive forwarded event post retained. Preserve Drive-folder link; event venue remains unidentified.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-09-15-off-by-one-2026/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11503 - 2026-09-15-off-by-one-2026/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-15-off-by-one-2026/index.md>) (messages 11503, 11504, 11505, 11506, 11507, 11508, 11509, 11510, 11511, 11512).

Review flags:

- Post 11503: **missing-media** - 2 unavailable attachments
- Post 11503: **forwarded** - Forwarded source retained; check attribution/context

### 64. CLIC donut conversation

[src/content/posts/2026/_unsorted/2026-09-16-clic-donuts/index.md](<../src/content/posts/2026/_unsorted/2026-09-16-clic-donuts/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-bro-where-clic-donuts/`
- Article timestamp: `2026-09-16T20:23:26+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: NUS (Singapore / Singapore; comparison) - NUS (comparison/request); CLIC / Hall INM (Switzerland / Lausanne; visited) - CLIC / Hall INM (forwarded invitation).
- Cover: source post 11514.
- Grouping notes: Suggest exclusion as unrelated chatter, but retain both files. Invitation is not proof of attendance in Lausanne.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-09-16-clic-donuts/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11513 - 2026-09-16-bro-where-clic-donuts/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-16-bro-where-clic-donuts/index.md>) (messages 11513).
  - [Post 11514 - 2026-09-16-francais/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-16-francais/index.md>) (messages 11514).

Review flags:

- Post 11513: **suggest-exclude** - Unrelated forwarded/admin update; retain until manually filtered
- Post 11513: **no-photo** - No exported photo for this post
- Post 11514: **suggest-exclude** - Unrelated forwarded/admin update; retain until manually filtered
- Post 11514: **forwarded** - Forwarded source retained; check attribution/context

### 65. Exchange mapping finalised

[src/content/posts/2026/_unsorted/2026-09-23-exchange-mapping-finalised/index.md](<../src/content/posts/2026/_unsorted/2026-09-23-exchange-mapping-finalised/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-after-few-months-midway/`
- Article timestamp: `2026-09-23T14:56:05+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Exchange/NUS context (Singapore / Singapore; mentioned) - Exchange/NUS context; no definite outing venue.
- Cover: source post 11515.
- Grouping notes: 11518/11519 repeat exact text; 11515 overlaps first paragraph. Suggest filtering 11515 and 11519; no automatic deduplication. 11521 free-food update optional exclusion.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-09-23-exchange-mapping-finalised/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11515 - 2026-09-23-after-few-months-midway/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-23-after-few-months-midway/index.md>) (messages 11515, 11516, 11517).
  - [Post 11518 - 2026-09-23-after-few-months-midway-11518/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-23-after-few-months-midway-11518/index.md>) (messages 11518).
  - [Post 11519 - 2026-09-23-after-few-months-midway-11519/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-23-after-few-months-midway-11519/index.md>) (messages 11519).
  - [Post 11521 - 2026-09-23-anyway-time-milk-more/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-23-anyway-time-milk-more/index.md>) (messages 11521).

Review flags:

- Post 11515: **suggest-exclude** - Repeated/overlapping mapping update; retain until manually filtered
- Post 11519: **suggest-exclude** - Repeated/overlapping mapping update; retain until manually filtered
- Post 11521: **suggest-exclude** - Unrelated forwarded/admin update; retain until manually filtered

### 66. Tervels YouTube update

[src/content/posts/2026/singapore-local-return-period/2026-09-25-tervels-youtube-update/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-09-25-tervels-youtube-update/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-back-tervels-content-youtube/`
- Article timestamp: `2026-09-25T22:26:09+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Off By One 2026 venue (Singapore / Singapore; mentioned) - Off By One 2026 venue (unresolved); NUS Career Fest venue (Singapore / Singapore; mentioned) - NUS Career Fest venue (unresolved).
- Cover: none.
- Grouping notes: Keep announcement intact as one post because it links two events; preserve both URLs. Do not move whole announcement into only Off By One article.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-09-25-tervels-youtube-update/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11522 - 2026-09-25-back-tervels-content-youtube/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-25-back-tervels-content-youtube/index.md>) (messages 11522).

Review flags:

- Post 11522: **no-photo** - No exported photo for this post

### 67. Utown outing

[src/content/posts/2026/singapore-local-return-period/2026-09-26-utown/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-09-26-utown/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-didn-t-know-utown/`
- Article timestamp: `2026-09-26T20:03:05+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); University Town / UTown (Singapore / Singapore; visited); Air-conditioned area (Singapore / Singapore; mentioned) - Air-conditioned area (room unresolved).
- Cover: source post 11523.
- Grouping notes: 
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-09-26-utown/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11523 - 2026-09-26-didn-t-know-utown/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-26-didn-t-know-utown/index.md>) (messages 11523).

### 68. Ritz Carlton and Tiny Tapeout day

[src/content/posts/2026/singapore-local-return-period/2026-09-28-ritz-carlton-and-tinytapeout/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-09-28-ritz-carlton-and-tinytapeout/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-here-last-year-espressif/`
- Article timestamp: `2026-09-28T18:14:30+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Ritz-Carlton (Singapore / Singapore; visited) - Ritz-Carlton (branch confirm); ST Engineering cohesion lunch venue (Singapore / Singapore; visited); Tiny Tapeout workshop venue (Singapore / Singapore; visited); Espressif (Czech / Brno; retrospective) - Espressif (retrospective); Shanghai (China / Shanghai; retrospective) - Shanghai (retrospective); NUSC class (Singapore / Singapore; skipped) - NUSC class (skipped).
- Cover: source post 11524.
- Grouping notes: Same Singapore-day article with lunch and workshop. References and skipped class are not new visits.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-09-28-ritz-carlton-and-tinytapeout/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11524 - 2026-09-28-here-last-year-espressif/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-28-here-last-year-espressif/index.md>) (messages 11524, 11525, 11526, 11527, 11528, 11529, 11530, 11531, 11532).
  - [Post 11533 - 2026-09-28-then-went-tinytapeout-workshop/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-28-then-went-tinytapeout-workshop/index.md>) (messages 11533, 11534).

### 69. Nice Hack outing

[src/content/posts/2026/singapore-local-return-period/2026-09-26-nice-hack/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-09-26-nice-hack/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-09-oh-yeah-nice-hack/`
- Article timestamp: `2026-09-26T12:00:00+08:00`; Visit date follows approved plan/calendar; noon in Asia/Singapore is a placeholder because actual visit time is unknown.
- Locations: Singapore (Singapore / Singapore; visited); Nice Hack venue (Singapore / Singapore; visited) - Nice Hack venue (unidentified); NTU booths / Sentinels context (Singapore / Singapore; mentioned).
- Cover: source post 11535.
- Grouping notes: October 1 upload says last Saturday/Sunday: September 26-27 candidate interval, not confirmed attendance timestamp. Preserve source timestamp; do not confuse Nice Hack with ph0wn/Nice trip.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-09-26-nice-hack/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11535 - 2026-09-30-oh-yeah-nice-hack/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-09-30-oh-yeah-nice-hack/index.md>) (messages 11535, 11536, 11537, 11538, 11539, 11540, 11541, 11542, 11543, 11544).

Review flags:

- Post 11535: **missing-media** - 2 unavailable attachments

### 70. YIH outing

[src/content/posts/2026/singapore-local-return-period/2026-10-05-yih/index.md](<../src/content/posts/2026/singapore-local-return-period/2026-10-05-yih/index.md>)

- Website route: `/tervels/posts/singapore/singapore/2026-10-yih/`
- Article timestamp: `2026-10-05T20:02:47+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Singapore (Singapore / Singapore; visited); Yusof Ishak House? (Singapore / Singapore; visited) - Yusof Ishak House? (source: YIH; confirm).
- Cover: none.
- Grouping notes: Retain short caption and forwarded missing-video record. Flag missing photo and uncertain venue.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/singapore-local-return-period/2026-10-05-yih/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11545 - 2026-10-05-yih/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-10-05-yih/index.md>) (messages 11545, 11546).

Review flags:

- Post 11545: **missing-media** - 1 unavailable attachments
- Post 11545: **forwarded** - Forwarded source retained; check attribution/context
- Post 11545: **no-photo** - No exported photo for this post

### 71. Podcasting

[src/content/posts/2026/_unsorted/2026-10-08-podcasting/index.md](<../src/content/posts/2026/_unsorted/2026-10-08-podcasting/index.md>)

- Website route: `/tervels/posts/unknown/unknown/2026-10-podcasting/`
- Article timestamp: `2026-10-08T12:33:25+08:00`; Original Telegram posting time retained; visit-date uncertainties are in grouping_notes.
- Locations: Podcasting venue (Unknown / Unknown; visited) - Podcasting venue (unidentified).
- Cover: none.
- Grouping notes: Retain caption and missing-video record; location unresolved.
- Provenance: [telegram-sources.json](<../src/content/posts/2026/_unsorted/2026-10-08-podcasting/telegram-sources.json>).
- Original source files, in combination order:

  - [Post 11547 - 2026-10-08-podcasting/index.md](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/posts/2026/telegram-staging/2026-10-08-podcasting/index.md>) (messages 11547).

Review flags:

- Post 11547: **missing-media** - 1 unavailable attachments
- Post 11547: **no-photo** - No exported photo for this post

## Retained source and execution records

[Combination plan](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/COMBINATION-PLAN.md>) records the approved proposal; [execution record](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/import-execution.json>) records the actual outputs, and [validation record](<C:/Users/zunmun/AppData/Local/Temp/tervels-telegram-review-2026-10-08/import-validation.json>) records the completed checks. The excluded Zurich staging files remain intact; Dubai was excluded before staging.

## All-photo gallery update

Linked all 754 distinct available photos across 56 articles. The existing 56 covers are reused; 698 additional optimized images appear in galleries. One repeated source file reference is displayed once. The remaining 15 articles have no exported photos. No Telegram text or source Markdown was changed. Dubai and Zurich remain excluded from the import, and `.gitignore` remains unchanged.

Validated all 71 article bodies, exact source-photo coverage and ordering, generated thumbnail/full-size links, and all 191 staged Markdown hashes. The updated build and all 101 tests passed. Per-image provenance is recorded in each article's `telegram-sources.json`; detailed execution and validation records are in the staging folder as `photo-update-execution.json` and `photo-update-validation.json`.

## Video article photo removal ? October 9, 2026

At your request, photo covers and galleries were removed from 17 newly imported articles with videos (346 distinct photo references). Four other new video articles were already photo-free. Text, video links and YouTube listing thumbnails are preserved. Image files and original staged Markdown/assets are retained. [File-by-file changes](video-article-photo-removal-2026-10-09.md).
