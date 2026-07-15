# Barry’s AutoPilotROI ChatGPT Handoff

This is the complete setup and fallback guide for giving Barry a conversational way to change AutoPilotROI.

## Recommended setup for Jody

Use a **shared ChatGPT Project**, not a shared link to one chat. A shared Project carries the project’s chats, files, and instructions into Barry’s own conversations.

1. Open the AutoPilotROI Project in ChatGPT.
2. Open the Project menu and choose **Project settings**.
3. Paste the contents of `CHATGPT-PROJECT-INSTRUCTIONS.md` into the Project instructions.
4. Add these current source files to the Project if they are not already available through the repository connection:
   - `PROJECT-CURRENT-STATE.md`
   - `WORKFLOW.md`
   - `REVIEW-GUIDE-for-Barry.md`
5. Select **Share** → **Only those invited**.
6. Invite Barry by the email address used for his ChatGPT account.
7. Give Barry **Chat access** initially. Chat access lets him see and interact with the Project’s chats, files, and instructions without changing the Project setup or inviting other people.

Do not use “Anyone with a link” unless broader access is genuinely intended.

## Access Barry needs to make changes

Project context and service authorization are separate. On Barry’s account, confirm:

- He can open the shared AutoPilotROI ChatGPT Project.
- His GitHub connection can access `jodysachse72-arch/autopilotroi` with permission to create branches and pull requests.
- His Vercel connection can access the AutoPilotROI development project and its previews.
- He has accepted any required GitHub or Vercel team invitations.

Supabase access is not required for ordinary copy and visual changes. Add it only when Barry is expected to request and execute backend or database work. Never send credentials through chat.

## Message to send Barry

Hey Barry,

I’ve invited you to our shared **AutoPilotROI** Project in ChatGPT. This is now the easiest way to work on the new site.

Open the Project, start a new chat, and tell ChatGPT what you want in normal language. You can say, “I don’t like this headline,” “these cards need more room,” “make this work better on mobile,” or “something broke when I clicked Continue.” Screenshots and the page URL help, but you do not need technical instructions.

ChatGPT will make the change on a branch, test it, and give you a Vercel preview. Look at the preview and keep responding naturally until it feels right. When you say it is approved, ChatGPT will merge it.

Please don’t paste passwords, API keys, or private credentials into the chat.

That’s it. If you can describe what you want, you can use it.

— Jody

## Barry’s first message

Barry should not need a large prompt when the shared Project is configured. This is enough:

> I’m Barry. Before making changes, confirm that you can read the AutoPilotROI project instructions, access the GitHub repository and Vercel project, and identify the current `main`. Then tell me you’re ready. I’ll look at the Vercel site and tell you what I want changed in plain English.

## Fallback bootstrap prompt

Use this only if Barry is working outside the shared Project or ChatGPT appears to lack context:

> You are helping me work on AutoPilotROI. The repository is `jodysachse72-arch/autopilotroi`. Before editing, read `AGENTS.md`, `WORKFLOW.md`, and `PROJECT-CURRENT-STATE.md`, confirm the current `main`, and confirm access to the connected AutoPilotROI Vercel project. I am nontechnical and will describe changes in ordinary language. Translate what I mean into complete, focused changes; preserve unrelated approved work; follow the homepage’s centered responsive card containment; run appropriate checks; create a Vercel preview; and wait for my approval before merging. The old Antigravity LOCKED-zone rules are retired, but real authentication, authorization, RLS, secret handling, migrations, and protected-main safeguards remain. Work only on the new Vercel application until Jody explicitly begins the launch phase. Do not make a change yet—first summarize your understanding and access status.

## The normal Barry loop

1. Barry opens the Vercel application and notices something.
2. Barry starts or continues a chat inside the shared AutoPilotROI Project.
3. He names the page or pastes its Vercel URL and says what he wants.
4. ChatGPT inspects, implements, tests, and provides a new Vercel preview.
5. Barry reviews it and responds naturally.
6. ChatGPT refines until Barry explicitly approves.
7. ChatGPT merges the pull request and confirms the updated `main` deployment.

## Troubleshooting

- **ChatGPT knows the project but cannot edit code:** connect or reauthorize GitHub for Barry’s account and confirm repository permissions.
- **Code changed but no preview appears:** connect or reauthorize Vercel and verify the GitHub branch triggered a deployment.
- **ChatGPT lacks the project background:** verify the chat is inside the shared AutoPilotROI Project and that Project instructions and source files are present.
- **Barry only received a chat link:** invite him to the Project itself. A single shared-chat link is a snapshot, not the ongoing collaboration space.
- **Two people request overlapping changes:** keep each request in a focused branch and reconcile the branches before either merges.

## Successful onboarding test

Barry is fully onboarded when he can request one real change in plain English, receive and review a Vercel preview, request one refinement if needed, approve it, and have ChatGPT merge it without Barry touching code or translating his request into technical language.

Official ChatGPT Projects guidance: https://help.openai.com/en/articles/10169521-projects-in-chatgpt
