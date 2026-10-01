# Northstar client reporting portal

A static prototype of a password-protected, multi-client Google Ads and Meta Ads reporting portal. Each client can sign in and browse monthly reports beginning in September 2026.

## Run locally

```bash
cd /workspace/dashboard
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Demo client access

There are ten seeded client accounts. Their login details follow this pattern:

| Client | Email | Password |
| --- | --- | --- |
| Maison April | `maison-april@client.northstar.co` | `Northstar1!` |
| Atlas Wellness | `atlas-wellness@client.northstar.co` | `Northstar2!` |
| Flora Studio | `flora-studio@client.northstar.co` | `Northstar3!` |
| Solace Home | `solace-home@client.northstar.co` | `Northstar4!` |
| Northline Coffee | `northline-coffee@client.northstar.co` | `Northstar5!` |
| Luma Skin | `luma-skin@client.northstar.co` | `Northstar6!` |
| Goodfolk Market | `goodfolk-market@client.northstar.co` | `Northstar7!` |
| Sunday Racket | `sunday-racket@client.northstar.co` | `Northstar8!` |
| Morrow Cycles | `morrow-cycles@client.northstar.co` | `Northstar9!` |
| Cinder Travel | `cinder-travel@client.northstar.co` | `Northstar10!` |

## Important security note

This is a visual prototype. Its credentials and report data are held in browser JavaScript, so it **must not be deployed for real clients**. A production portal needs server-side authentication, hashed passwords, access controls, and a database or secure reporting-data source.
