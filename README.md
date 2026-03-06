# Visual Media Lab – Homepage (Hugo)

경희대학교 VML 연구실 웹사이트를 **Hugo 정적 사이트 생성기**로 운영하는 저장소입니다.
웹 개발 경험 없이도 **Markdown 파일만 수정**해서 콘텐츠를 관리할 수 있습니다.

---

## 폴더 구조

| 경로 | 역할 | 수정 빈도 |
|---|---|---|
| `content/news/*.md` | 뉴스 (수상, 채택, 과제 소식) | 자주 |
| `content/members/*.md` | 재학생 (PhD/MS) | 가끔 |
| `content/alumni/*.md` | 졸업생 | 가끔 |
| `content/publications/*.md` | 논문 목록 | 가끔 |
| `content/grants/*.md` | 연구 과제 | 드물게 |
| `content/_index.md` | 홈 페이지 텍스트 (About, FAQ) | 드물게 |
| `layouts/` | HTML 템플릿 | 거의 수정 안 함 |
| `static/` | CSS/JS/이미지 | 거의 수정 안 함 |
| `public/` | Hugo 빌드 결과물 **(직접 수정 금지)** | - |

---

## 콘텐츠 수정 방법

### 뉴스 추가

`content/news/YYYY-MM-DD-slug.md` 파일 생성:

```markdown
---
title: "[축!] 홍길동 학생, CVPR 2026 Accept! (2026.01.01)"
date: 2026-01-01
category: accept        # accept / award / grant
label: "Top 학술대회 Accept"
image: "파일명.png"      # static/img/project/ 에 있는 이미지
showhome: true          # 홈 화면에 표시할지 여부
---

상세 내용을 여기에 마크다운으로 작성합니다.
```

### 구성원 추가

`content/members/slug.md` 파일 생성:

```markdown
---
title: "홍길동"
engName: "Gildong Hong"
degree: "PhD"           # PhD / MS
position: "FCM (PL)"
department: "Computer Science and Engineering"
email: "gildong@khu.ac.kr"
image: "gildong.jpg"    # static/img/people/ 에 이미지 추가
github: "https://github.com/..."
weight: 7               # 숫자가 작을수록 먼저 표시
---
```

### 논문 추가

`content/publications/YYYY-MM-NN-slug.md` 파일 생성:

```markdown
---
title: "논문 제목"
firstAuthor: "홍길동"
coauthors: "이영희, 김교수<sup>†</sup>"
venue: "CVPR 2026"
year: 2026
yearMonth: "2026.01"
type: "International"   # International / Domestic
image: "paper_img.png"
doi: "https://doi.org/..."
---
```

### 연구 과제 추가

`content/grants/slug.md` 파일 생성:

```markdown
---
title: "과제 제목"
organization: "NRF"
img_url: "NRF.png"
subtitle: "지원기관 상세"
date_range: "Jan. 2026 - Dec. 2028"
status: "Ongoing"       # Ongoing / Completed
weight: 1
---
```

---

## 배포 흐름

```
Markdown 수정/추가
    ↓
git commit + push (새 브랜치)
    ↓
Pull Request 생성
    ↓
관리자 리뷰 & 머지 (main 브랜치)
    ↓
GitHub Actions 자동 실행 → GitHub Pages 배포
```

---

## 로컬 개발

```bash
# Hugo 설치 (macOS)
brew install hugo

# 로컬 서버 실행 (프로젝트 루트에서)
hugo server -D

# 브라우저에서 확인
open http://localhost:1313/
```
