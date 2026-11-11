# Visual Media Lab – Homepage (Hugo)

경희대학교 VML 연구실 웹사이트를 **Hugo 정적 사이트 생성기**로 운영하는 저장소입니다.

---

## 배포 흐름

```
Contents 수정/추가/삭제 (Sveltia CMS)
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
