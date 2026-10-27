# 나의 얼렁뚱땅

Jihoon LEE (aka Ernesto)의 개인 블로그. Astro의 정적 HTML을 GitHub Pages에서 제공합니다.

## 로컬 실행

Node.js **24 LTS**를 사용합니다 (`.nvmrc`).

```sh
npm ci
npm run dev
```

개발 서버 주소는 터미널에 표시됩니다. 배포 결과를 그대로 확인하려면:

```sh
npm run check
npm run build
npm test
npm run preview -- --host 127.0.0.1
```

## 글 작성

기존 글과 이미지는 `content/blog/<slug>/`에 그대로 있습니다.

```text
content/blog/my-post/index.md
content/blog/my-post/photo.jpg
```

`index.md`의 frontmatter에 `title`, `date`, `description`, 선택적으로 `tags`를 작성합니다. 기존 글과 동일하게 Markdown 이미지 또는 `<figure><img src="photo.jpg">…</figure>`를 사용할 수 있습니다. 빌드 전 준비 스크립트가 이미지 원본을 `public/<slug>/`로 복사하며 이 복사본은 Git에서 제외합니다. 글은 `/<slug>/`에 생성됩니다.

## 이전 시 보존한 것

- 원본 Markdown 6개와 함께 저장된 이미지: 내용과 바이트를 변경하지 않았습니다.
- 글 URL과 끝의 `/`, 글 사이의 상대 링크.
- Giscus 저장소·저장소 ID·카테고리 ID·`pathname` 매핑과 기존 표시 설정. 댓글 데이터는 기존 GitHub Discussions에 남습니다. 로컬에서도 댓글 기능은 실제 Discussions에 연결되므로 테스트 댓글을 작성하지 마세요.
- `/rss.xml`: 기존 항목의 GUID·발행일, 전체 본문. 이미지와 링크는 피드에서 절대 주소로 변환합니다.
- 과거 `/static/...` 주소: 기존 배포의 정적 파일을 `public/static/`에 보관합니다. 외부에서 공유된 옛 이미지 주소도 유효합니다.
- `/using-typescript/`: 기존 예제 URL은 간단한 안내 페이지로 남겨둡니다.

`npm test`는 생성된 글, 원본 이미지의 동일성, 기존 정적 파일, 내부 링크, canonical, Giscus 설정, RSS, sitemap, 404를 확인합니다. 향후 기존 글의 slug를 바꾸면 댓글 매핑과 외부 링크가 끊어질 수 있으니 주소는 유지하세요.

Markdown의 HTML은 저장소 작성자가 관리하는 신뢰된 콘텐츠로 취급합니다. 사용자 입력을 그대로 글 HTML에 추가하지 않습니다. 본문에는 React hydration이 없고 코드 강조도 빌드 시 수행됩니다. 외부 JavaScript는 댓글의 Giscus에 한정됩니다.

## GitHub Pages 자동 배포

**main에 커밋을 push하거나 PR을 main에 머지하면 자동으로 배포됩니다.** 빌드·타입 검사·콘텐츠 검증·보안 검사가 모두 통과해야 공개 사이트가 갱신됩니다. PR 브랜치에서는 검증과 빌드만 실행하고 배포하지 않습니다.

새 글을 올리는 순서:

1. 글과 이미지를 추가하고 로컬 미리보기에서 확인합니다.
2. main에 커밋을 push하거나 PR을 만들어 main에 머지합니다.
3. **Actions → Build and deploy Astro**에서 빌드와 배포의 성공 여부를 확인합니다. 실패하면 로그를 확인해 수정한 뒤 다시 push합니다.

설정 변경 없이 다시 배포하려면 같은 워크플로의 **Run workflow → main**을 수동 실행할 수도 있습니다. Pages의 Source는 이미 **GitHub Actions**로 설정되어 있습니다.

주소는 계속 `https://jihoon-ernesto.github.io/`입니다. 사용자 사이트이므로 별도 `base` 경로를 설정하지 않습니다. 별도 PAT나 클라우드 서비스는 필요하지 않습니다. 배포 job만 Pages 쓰기·OIDC 권한을 받으며, PR 빌드는 저장소 읽기 권한만 가집니다. Actions는 커밋 SHA로 고정했고 Dependabot이 npm과 Actions 업데이트를 월별로 제안합니다.

## 의존성 업데이트

Dependabot은 월별로 업데이트를 제안합니다. GitHub Actions 업데이트는 하나의 PR로 묶어서 빌드와 실제 배포의 호환성을 함께 확인합니다. 자동 머지는 설정하지 않습니다.

TypeScript는 현재 6.0.3을 유지합니다. `@astrojs/check` 0.9.12의 지원 범위가 TypeScript 5·6이어서 TypeScript 7 업데이트는 설치 단계에서 실패합니다. 반복되는 비호환 PR을 막기 위해 TypeScript **7.x만** Dependabot 버전 업데이트에서 제외했습니다. Astro 검사 도구가 TypeScript 7을 지원하면 `.github/dependabot.yml`의 해당 `ignore` 항목을 제거하고 다시 검증합니다. 다른 패키지와 TypeScript 6 계열 업데이트는 계속 확인합니다.

## 롤백

문제가 있으면 Settings → Pages의 Source를 **Deploy from a branch**, 브랜치를 **gh-pages / (root)**로 되돌립니다. 이전 Gatsby 배포 브랜치는 이 마이그레이션에서 수정하지 않습니다. 필요하면 GitHub Pages의 재빌드를 요청하고 기존 사이트가 응답하는지 확인합니다.
