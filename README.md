# Next.js 15 S3 + CloudFront + Route53 배포 가이드

이 프로젝트는 **Next.js 15** 기반이며, AWS S3 + CloudFront + Route53을 이용해 정적 웹사이트로 배포할 수 있습니다.

---

## 1. next.config.ts 설정 (정적 Export 모드)

`next.config.ts` 파일에 아래 설정을 추가하세요:

```ts
const nextConfig = {
  output: 'export', // 정적 사이트로 내보내기
  // ...기존 설정 유지
};

export default nextConfig;
```

---

## 2. 정적 파일 빌드 및 내보내기

터미널에서 아래 명령어를 실행하세요:

```bash
npm run build
```

- `/out` 폴더가 생성됩니다. 이 폴더가 S3에 업로드할 정적 사이트입니다.

---

## 3. S3 버킷 생성 및 파일 업로드

1. AWS S3 콘솔에서 **새 버킷**을 생성합니다.
   - 버킷 이름: 원하는 도메인(예: `www.example.com`)
   - 퍼블릭 액세스 차단 해제 (정적 웹 호스팅용)
2. [정적 웹사이트 호스팅] 활성화
   - 인덱스 문서: `index.html`
   - 오류 문서: `404.html` (있다면)
3. `/out` 폴더의 모든 파일을 S3 버킷에 업로드합니다.

---

## 4. CloudFront 배포 생성 및 S3 연결

1. AWS CloudFront 콘솔에서 **배포 생성**
2. 원본 도메인에 S3 버킷을 선택
3. [정적 웹사이트 호스팅 엔드포인트]를 원본으로 사용 (S3 REST API 엔드포인트가 아님)
4. 필요시 OAI(Origin Access Identity) 또는 OAC(Origin Access Control) 설정
5. 기본 경로: `/index.html`
6. 배포 생성 후, CloudFront 도메인(예: `dxxxx.cloudfront.net`)이 발급됩니다.

---

## 5. Route53에서 도메인 연결

1. Route53에서 **호스팅 영역** 생성 (도메인 등록)
2. A 레코드(별칭)로 CloudFront 도메인 연결
   - 레코드 유형: A
   - 별칭: 예
   - 별칭 대상: CloudFront 배포 도메인 선택
3. 도메인 네임서버(NS) 값을 도메인 등록기관에 반영

---

## 6. (선택) HTTPS 인증서 발급 (ACM)

1. AWS Certificate Manager(ACM)에서 인증서 요청 (예: `www.example.com`)
2. CloudFront 배포 설정에서 ACM 인증서 연결
3. CloudFront 배포를 다시 배포하여 HTTPS 적용

---

## ⚠️ 참고 및 주의사항
- Next.js의 SSR/ISR, API Route 등은 S3+CloudFront 정적 배포에서 동작하지 않습니다.
- 정적 export가 불가능한 동적 기능이 있다면, Vercel, AWS Lambda@Edge, 또는 별도 서버리스 백엔드와 연동해야 합니다.
- S3 버킷 정책, CloudFront 캐싱 정책, CORS 설정 등은 프로젝트 상황에 맞게 추가 설정하세요.

---

## 빠른 명령어 요약
```bash
npm run build
npx next export
# /out 폴더를 S3에 업로드
```
