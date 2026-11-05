import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;
export function Arrow({ className, ...props }: Props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}
export function ArrowUpRight(props: Props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M6 18 18 6M6 6h12v12" /></svg>;
}
export function Download(props: Props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4" /></svg>;
}
export function FlutterMark(props: Props) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M14.3 2H22L8.2 15.8 4.3 12 14.3 2Zm0 9.2H22l-7 7 7 7h-7.7L7.4 18l6.9-6.8Z" transform="translate(0 -1) scale(.9)" /></svg>;
}
export function CodeMark(props: Props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" /></svg>;
}
export function Mail(props: Props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></svg>;
}
