# Backend development plan for Wazuh and n8n
_Exported on 3/30/2026 at 14:40:35 CDT from Cursor (2.6.20)_

---

**User**

i made a plan in @h:\wazuh-n8n\ the plan mostly outlines what i want to build

wazuh-n8n is a clean fork of the wazuh/wazuh SIEM opensource platform

@h:\AKINSEC\app-akinsec\ is the app itself

@akinsec is the code i added to this workspace of the website code

the plan is @wazuh-n8n/.cursor/plans/siem_orchestration_backend_e5d4b0e2.plan.md 

i want to work on it on this codebase i pulled from the current app i built on the base44 platform (base44.com)

i dont think the code download downloaded any data from the databses, but i dont have any users besides test accounts and people i showed to test the app earlier

im ok gutting the whole thing app-akinsec if i have to 

idk what im doing here its pretty new to me but i want to do this right 

but i want to essentially build the backend work that does the plan that upon making a new user, the dashboard is ready to spin up containers and run an instance of wazuh and n8n on docker containers on hostinger - i want this to all be automatic and stuff 

build a new plan and look through all this and help me get my thougths in order 

---

**Cursor**


Reviewing your SIEM orchestration plan and exploring the app-akinsec codebase so we can produce a coherent plan.




Confirming: `app-akinsec` is a Base44-tied Vite/React SPA with no local backend; provisioning requires a server we control. Asking one decision that affects integration.



**Dashboard and auth direction**

> **For the next 3–6 months, how do you want the dashboard to authenticate and store tenant/instance state? (This decides how we hook “new user” to provisioning.)**
> - Keep Base44 for login/UI for now; add a separate control-plane API + only swap data calls where needed (if Base44 supports signup/webhooks or manual “Provision” button first).
> - Migrate off Base44: own backend (e.g. Node/Fastify or Next API) + Postgres + an auth provider with webhooks (Clerk, Auth0, Supabase Auth, Better Auth, etc.). ✔
> - Not sure — recommend the lowest-risk path for a solo/small team.


Incorporating your choice to migrate off Base44: we'll anchor the plan on a self-hosted API, Postgres, and an auth provider with signup webhooks.



---

**User**

to clarify @akinsec is located at "H:\Projects\AKINSEC\github repo\akinsec"

idk if its already in the plan or will already be in place, but how can i do this so that when a new user creates a new account and wants to make a VPS on hostinger (or whatever platform, but hostinger seems the cheapeast and has controls in place for manual maintenance if necessary; other option is AWS but that's also meh dont want to deal with that headache) so that the VPS is on their own separate and private account instead of a grouped account like mine for example do you understand me? 

like i mean not so that customers all become VPSs all under 1 business account, but instead are separate VPSs on individual accounts so that theres no possible overlap between users or security risks in that regard you get me

---

**Cursor**


Clarifying: you want each customer's infrastructure under their Hostinger (or other) account—not one platform account provisioning every VPS. Locating and updating the plan to document the `akinsec` repo path and this BYOI / customer-credentials model.




Updating the plan: adding the `akinsec` site path and a clear BYOI section — each customer uses their Hostinger account (their API token or manual bootstrap), not one platform-wide account.




Yes—that’s a clear requirement, and it **was not** spelled out in the earlier version of the plan. The default “Hostinger API from our backend” story is often **one company API key → many VMs**, which is exactly what you want to avoid.

I updated [akinsec_control-plane_plan_8cdeffc2.plan.md](file:///C:/Users/Mark/.cursor/plans/akinsec_control-plane_plan_8cdeffc2.plan.md) with:

1. **`akinsec` site path** — [akinsec](file:///H:/Projects/AKINSEC/github%20repo/akinsec) at `H:\Projects\AKINSEC\github repo\akinsec`, separate from [app-akinsec](h:/AKINSEC/app-akinsec).

2. **BYOI (customer-owned cloud)** — two concrete patterns:
   - **Per-customer Hostinger API token** — They create a token in **their** hPanel (scoped to **their** account). You store it encrypted; the worker uses **that tenant’s token only** so VMs and billing stay in **their** account—no single AKINSEC-wide token owning everyone’s VPS.
   - **Manual bootstrap** — They create the VPS in **their** account and run your post-install / bootstrap; you never hold Hostinger API credentials (strongest isolation, more UX friction).

3. **Explicit “out of scope”** — A single shared business account that provisions all customer VPSs, unless you later add a separate managed/reseller product.

4. **Flow + todos** — Provisioning flow, Postgres field, and Phase 2 now assume **per-tenant credentials** (or manual path), not one global Hostinger key.

**Reality check:** Hostinger’s API tokens are almost always **tied to one Hostinger login/account**, so “their token → their VMs” is the normal way to get what you want without AWS. You’ll still want to **verify** in their current API docs that tokens cannot act across accounts (they shouldn’t).

If you want the next plan tweak: we can add a short **“Connect Hostinger”** onboarding step (paste token vs upload script only) as the default UX before any auto-provision runs.

---

**User**

instead of "Connect hostinger" ill have the UX be like "connect cloud" or whatever

idk whats better - would it be better to have 1 company controlled backend, where my company would shoulder the VPS responsbility andcustomers would pay to add, there wouldnt/shoudlnt be an instance where a customer would have more than 1 VPS, unless they have more than 1 network that they want isolated so theyd have 2 or more VPSs that run separate wazuh n8n containers

idk how that works on the hostinger end 

also idk how that would affect cost - i would have monthly costs for hostinger and itdbe based on how many customers i have, but what if i get some random spike and a huge influx of VPS requests that spike my bill 

if customers are separate accounts idk how limited my control over it will be 

i could have it like where customers have separate accounts that are controlled and operated by me my company, but the customers still has credentials - essentially credential sharing - i think there might be options on hostinger for shared accounts? idk heres an article on it 
https://www.hostinger.com/support/1583777-how-to-share-access-to-your-account-at-hostinger/ 

theres a risk that the customer could unlink/unshare their hostinger account after they buy a subscription to my service and then essentially steal the wazuh and n8n containers and integration work thats on there

if thats the risk would it better to then just have it all uniform under 1 company account that spins up separate VPSs that are isolated from each other

idk what to do im just spilling my thoughts here

---

**Cursor**


Updating the plan: adding "Connect cloud" UX, comparing managed (single company account) vs BYOI, clarifying Hostinger Account Sharing vs API automation, and documenting spike controls and multi-VPS rules.




Revising the plan: we're weighing managed (single company account) vs BYOI. Incorporating "Connect cloud" UX, multi-VPS rules, bill-spike mitigations, and clarifying [Hostinger Account Sharing](https://www.hostinger.com/support/1583777-how-to-share-access-to-your-account-at-hostinger/) (panel collaborator access, not API ownership).




Here’s a tightened read of what you’re wrestling with, and the plan file is updated to match.

### “Connect cloud” vs “Connect Hostinger”
The plan now says to use **provider-agnostic** UX (**Connect cloud**, **Add infrastructure**, etc.) while the first implementation may still be Hostinger-only.

### Managed (one company account) vs separate customer accounts
You’re not wrong to flip between them—they’re **different products**:

| | **Managed (your Hostinger account)** | **BYOI (their Hostinger account)** |
|---|--------------------------------------|-------------------------------------|
| **Who pays Hostinger** | You | Them |
| **Isolation between customers** | Still **one VPS per customer** on separate VMs; isolation is per machine, not “one shared OS for everyone” | Same idea: one VM per stack, but under **their** billing |
| **Spike in signups** | **Your** bill can jump → need **queues, max concurrency, caps, alerts, waitlists**, maybe manual approval for big waves | **Their** Hostinger bills spike; **your** risk is mostly support/control plane cost |
| **If they stop paying you** | Infra is **yours**; you offboard/delete/migrate per ToS—they don’t “take” **your** VPS unless you transfer it | The VM is **theirs**; revoking API access hurts **your automation**, not **their ownership** of the server—it’s not really “stealing” your containers; it’s **their** box |

So: **uniform under one company account** = simpler customer UX, **you** carry infra risk and need **spike controls** + clear subscription/offboarding. **Separate accounts** = **they** carry VPS cost and **own** the asset; you trade that for **revocation** and “they keep the stack if they leave” unless you solve it with **product + legal** (not panel hacks).

### Hostinger Account Sharing ([article](https://www.hostinger.com/support/1583777-how-to-share-access-to-your-account-at-hostinger/))
That feature is **“let another human use my hPanel as a collaborator”** (with limits—e.g. no changing payment methods per their doc). It’s **not** a clean substitute for either:

- **Managed:** you use **your** API token and provision VMs yourself, or  
- **BYOI:** they give **you** an **API token** scoped to **their** account.

Relying on **shared panel access** as the main integration is fragile: they can **remove** your access, and you’re still not the **account owner** in the same way as API-based automation. The plan now says **don’t treat Account Sharing as the primary integration**—use it only if you need **support-style** access, not core provisioning.

### Multi-VPS per customer
The plan now encodes a simple rule: **default 1 VPS per customer**; **2+** only when they need **extra network isolation** (separate stacks), each with its own row in your DB and (if managed) your cost model.

### Where this lives
All of the above is written into [akinsec_control-plane_plan_8cdeffc2.plan.md](file:///C:/Users/Mark/.cursor/plans/akinsec_control-plane_plan_8cdeffc2.plan.md), including a **practical recommendation**: many teams **start managed** (simpler UX, one token, spike guardrails), then add **BYOI** later for customers who refuse third-party-held infra.

If you want to **lock one model** before implementation, say which default you’re choosing for v1 (managed vs BYOI); the plan already says to decide **`credential_mode`** before Phase 2 credential plumbing.

---

**User**

after thinking about it more, since im a service company that wants users to stay with me, itd prob be best to have uniform managed by me cloud instead of BYOI 

---

**Cursor**


Updating the plan to lock v1 to the managed (single org) model and treat BYOI as a future optional path.




That choice fits a **managed service** model: you keep the relationship, the infra, and a clear offboarding story, and you accept **Hostinger spend + spike guardrails** as an ops/finance problem instead of fighting **customer-owned** VMs and revocations.

I updated [akinsec_control-plane_plan_8cdeffc2.plan.md](file:///C:/Users/Mark/.cursor/plans/akinsec_control-plane_plan_8cdeffc2.plan.md) so **v1 is explicitly managed**:

- **Overview** and top **architecture table** assume a **single org API token** and **your** provider account, with **one isolated VPS per customer** by default.
- **Diagram** now shows **AKINSEC provider account** and **isolated VPS per tenant** (not customer-billed).
- New section **“Product decision — v1: managed”** states the service-company rationale; **BYOI** is kept only as **later optional** reference, **out of scope for v1** (including in “What to ignore” and success criteria).
- **Provisioning flow**, **Postgres**, **Phase 2**, and **todos** are aligned: **no per-tenant provider tokens** in v1; **spike/cancel guardrails** and **tenant → vm_id** mapping stay central.

When you’re ready to implement, the next concrete step is still **Phase 0** (one manual VPS stack) before wiring the org-token worker.

