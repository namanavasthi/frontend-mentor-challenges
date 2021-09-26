# Frontend Mentor Challenges

## Idea

- since i've been pumping out challenges from frontend mentor, i wanted to host all those challenge urls at one consolidated place
- this would help me mention it rater easily on resume or any place i'd like to tag my frontend projects at

## Feature

- get all my frontend mentor repos from github (github api)
- arrange some sort of filter and sorting scheme

## Thoughts

- so github docs are 💩
- its next to impossible to find things that you need, had a hard time trying to figure out what headers i needed to send to find my repos, pretty du du
- anyways, now that i can see the json being returned on repo fetch, here is what i can access per repo

```json
{
  "id": 111111111,
  "node_id": "string",
  "name": "string",
  "full_name": "string",
  "private": false,
  "owner": {
    "login": "string",
    "id": 1111111,
    "node_id": "string",
    "avatar_url": "<url string>",
    "gravatar_id": "",
    "url": "<url string>",
    "html_url": "<url string>",
    "followers_url": "<url string>",
    "following_url": "<url string>",
    "gists_url": "<url string>",
    "starred_url": "<url string>",
    "subscriptions_url": "<url string>",
    "organizations_url": "<url string>",
    "repos_url": "<url string>",
    "events_url": "<url string>",
    "received_events_url": "<url string>",
    "type": "User",
    "site_admin": false
  },
  "html_url": "<url string>",
  "description": "string",
  "fork": false,
  "url": "<url string>",
  "forks_url": "<url string>",
  "keys_url": "<url string>",
  "collaborators_url": "<url string>",
  "teams_url": "<url string>",
  "hooks_url": "<url string>",
  "issue_events_url": "<url string>",
  "events_url": "<url string>",
  "assignees_url": "<url string>",
  "branches_url": "<url string>",
  "tags_url": "<url string>",
  "blobs_url": "<url string>",
  "git_tags_url": "<url string>",
  "git_refs_url": "<url string>",
  "trees_url": "<url string>",
  "statuses_url": "<url string>",
  "languages_url": "<url string>",
  "stargazers_url": "<url string>",
  "contributors_url": "<url string>",
  "subscribers_url": "<url string>",
  "subscription_url": "<url string>",
  "commits_url": "<url string>",
  "git_commits_url": "<url string>",
  "comments_url": "<url string>",
  "issue_comment_url": "<url string>",
  "contents_url": "<url string>",
  "compare_url": "<url string>",
  "merges_url": "<url string>",
  "archive_url": "<url string>",
  "downloads_url": "<url string>",
  "issues_url": "<url string>",
  "pulls_url": "<url string>",
  "milestones_url": "<url string>",
  "notifications_url": "<url string>",
  "labels_url": "<url string>",
  "releases_url": "<url string>",
  "deployments_url": "<url string>",
  "created_at": "2021-09-19T20:27:19Z",
  "updated_at": "2021-09-20T17:07:20Z",
  "pushed_at": "2021-09-20T17:07:35Z",
  "git_url": "string",
  "ssh_url": "string",
  "clone_url": "<url string>",
  "svn_url": "<url string>",
  "homepage": null,
  "size": 510,
  "stargazers_count": 0,
  "watchers_count": 0,
  "language": "JavaScript",
  "has_issues": true,
  "has_projects": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": true,
  "forks_count": 0,
  "mirror_url": null,
  "archived": false,
  "disabled": false,
  "open_issues_count": 0,
  "license": null,
  "allow_forking": true,
  "forks": 0,
  "open_issues": 0,
  "watchers": 0,
  "default_branch": "main",
  "permissions": {
    "admin": true,
    "maintain": true,
    "push": true,
    "triage": true,
    "pull": true
  }
}
```

- off all this json these are things i'm interested in

```json
{
  "id": 111111111,
  "name": "string",
  "html_url": "<url string>",
  "homepage": "<url string>",
  "description": "string",
  "topics": ["string"],
  "contents_url": "string",
  "created_at": "2021-09-19T20:27:19Z",
  "has_pages": true
}
```

## Rules

- DESCRIPTION

```
Name : "",
Description : "",
Difficulty : "",
Challenge : "",
```

> NAME : string
> DESCRIPTION : string to show in card
> DIFFICULTY : number, string
> CHALLENGE : ulr to challenge

## what data can i show on UI ?

1. name of challenge `description` based on rules
2. difficulty of challenge `description` based on rules
   1. level (0,1,2,...)
   2. name
3. ulr for repo `html_url`
4. date `created_at`
5. live demo [ check for `has_pages`, `homepage`]
6. image [`/repos/{owner}/{repo}/contents/{path}` from `contents_url`] will be used to fetch image for challenge
7. topics from `topics`

## TODO

- take github api and store in context
