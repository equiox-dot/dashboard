# Convert8 client reporting portal

A static prototype of a password-protected, multi-client Google Ads and Meta Ads reporting portal. Each client can sign in and browse monthly reports beginning in September 2026.

## Run locally

```bash
cd /workspace/dashboard
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Demo client access

There are four seeded client accounts for the current client roster:

| Client | Email | Password |
| --- | --- | --- |
| Bliss Flowers | `bliss-flowers@client.convert8.io` | `Convert81!` |
| NOVAS Singapore | `novas-singapore@client.convert8.io` | `Convert82!` |
| Suuco | `suuco@client.convert8.io` | `Convert83!` |
| TWFP | `twfp@client.convert8.io` | `Convert84!` |

## Important security note

This is a visual prototype. Its credentials and report data are held in browser JavaScript, so it **must not be deployed for real clients**. A production portal needs server-side authentication, hashed passwords, access controls, and a database or secure reporting-data source.
