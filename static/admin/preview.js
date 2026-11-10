// ============================================================
// Decap CMS Preview Templates  (v3.3.3)
// Mirrors Hugo layouts/*.html / partials/*.html
// ============================================================

CMS.registerPreviewStyle('/css/bootstrap.min.css');
CMS.registerPreviewStyle('/css/style.css');
CMS.registerPreviewStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css');

// ── Image URL helper ─────────────────────────────────────────
// getAsset() returns AssetProxy; String() calls .toString() → URL
function imgUrl(getAsset, path, fallback) {
  if (!path) return fallback || '';
  try { var u = String(getAsset(path)); return u || fallback || ''; }
  catch (e) { return fallback || ''; }
}

// ── Preview disclaimer banner ─────────────────────────────────
function previewBanner() {
  return h('div', {
    style: {
      background: '#fff3cd',
      border: '1px solid #ffc107',
      borderRadius: '4px',
      padding: '6px 12px',
      marginBottom: '12px',
      fontSize: '0.8rem',
      color: '#856404',
    }
  }, '⚠ 실제 보여지는 레이아웃과 다를 수 있습니다.');
}

// ── Lab members reference box (Papers / Contributions) ────────
// /admin/members.json 은 Hugo 빌드 때 layouts/partials/cms-members-json.html 이 생성합니다.
// 저자 이름 표기를 통일할 수 있도록 미리보기 상단에 현재 멤버 목록을 보여 줍니다.
var labMembersCache = null;
var labMembersPromise = null;
function loadLabMembers() {
  if (!labMembersPromise) {
    labMembersPromise = fetch('/admin/members.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (data) {
        labMembersCache = (data && data.groups) ? data : { groups: [] };
        return labMembersCache;
      });
  }
  return labMembersPromise;
}

// create-react-class mixin: 목록을 한 번 불러온 뒤 state 로 넣어 다시 그림
var LabMembersMixin = {
  getInitialState: function () { return { labMembers: labMembersCache }; },
  componentDidMount: function () {
    var self = this;
    self._labMembersAlive = true;
    if (!labMembersCache) {
      loadLabMembers().then(function (data) {
        if (self._labMembersAlive) self.setState({ labMembers: data });
      });
    }
  },
  componentWillUnmount: function () { this._labMembersAlive = false; },
};

function labMembersBox(data) {
  var boxStyle = {
    background: '#f1f8ff', border: '1px solid #c8e1ff', borderRadius: '4px',
    padding: '8px 12px', marginBottom: '12px', fontSize: '0.8rem', color: '#24292e', lineHeight: 1.6,
  };
  if (!data) return h('div', { style: boxStyle }, '연구실 멤버 목록을 불러오는 중…');
  if (!data.groups.length) return h('div', { style: boxStyle }, '연구실 멤버 목록을 불러오지 못했습니다.');
  return h('div', { style: boxStyle },
    h('div', { style: { fontWeight: 600, marginBottom: '4px' } }, '연구실 멤버 (저자 이름 표기 참고용)'),
    data.groups.map(function (g, i) {
      return h('div', { key: i },
        h('strong', {}, g.label + ': '),
        g.members.map(function (m) { return m.korName ? m.name + ' (' + m.korName + ')' : m.name; }).join(', ')
      );
    })
  );
}

// ── Accordion-item helper (content always visible in preview) ─
function accordionItem(titleEl, bodyEl) {
  return h('div', { className: 'accordion-item mt-3' },
    h('h5', { className: 'accordion-header border-0' },
      h('div', {
        style: {
          padding: '1rem 1.25rem',
          color: '#2670bf',
          fontSize: '1.1rem',
          fontWeight: 600,
          background: 'rgba(236,238,244,0.6)',
          cursor: 'default',
        }
      }, titleEl)
    ),
    h('div', { className: 'accordion-body' }, bodyEl)
  );
}

// ── News ─────────────────────────────────────────────────────
// layouts/news/list.html — accordion (collapsed, body = .Content)
var NewsPreview = createClass({
  render: function () {
    var e = this.props.entry;
    var ga = this.props.getAsset;
    var title = e.getIn(['data', 'title'],  '(제목)');
    var label = e.getIn(['data', 'label'],  '');
    var img   = imgUrl(ga, e.getIn(['data', 'image']), '');

    return h('div', { style: { padding: '24px' } },
      previewBanner(),
      accordionItem(
        title,
        h('div', {},
          img && h('img', { src: img, style: { maxHeight: '280px', marginBottom: '1rem', borderRadius: '4px', display: 'block' } }),
          label && h('p', { style: { marginBottom: '0.5rem' } }, h('strong', {}, label)),
          this.props.widgetFor('body')
        )
      )
    );
  }
});

// ── Notices ──────────────────────────────────────────────────
// layouts/news/list.html notices section — accordion (open)
var NoticePreview = createClass({
  render: function () {
    var e = this.props.entry;
    var title = e.getIn(['data', 'title'], '(제목)');

    return h('div', { style: { padding: '24px' } },
      previewBanner(),
      accordionItem(title, this.props.widgetFor('body'))
    );
  }
});

// ── Gallery ──────────────────────────────────────────────────
// layouts/gallery/list.html — title + date range + image grid
var GalleryPreview = createClass({
  render: function () {
    var e  = this.props.entry;
    var ga = this.props.getAsset;
    var title   = e.getIn(['data', 'title'], '(제목)');
    var date    = e.getIn(['data', 'date'], '');
    var dateEnd = e.getIn(['data', 'date_end'], '');
    var images  = e.getIn(['data', 'images']);
    var imgList = images ? images.toJS() : [];

    var dateStr = date ? String(date).substring(0, 10) : '';
    if (dateEnd) dateStr += ' ~ ' + String(dateEnd).substring(0, 10);

    return h('div', { style: { padding: '24px' } },
      previewBanner(),
      h('h4', { className: 'mb-1' }, title),
      dateStr && h('p', { className: 'text-muted small mb-3' }, dateStr),
      h('div', { className: 'row g-3' },
        imgList.map(function (p, i) {
          var url = imgUrl(ga, p, '');
          return url
            ? h('div', { key: i, className: 'col-6 col-md-4 col-lg-3' },
                h('img', { src: url, style: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' } })
              )
            : null;
        })
      )
    );
  }
});

// ── Education line helper ────────────────────────────────────
// layouts/partials/education-line.html 과 같은 규칙
//   " Major, School (2024–Present)"  — end_year 비면 Present (start_year 있을 때)
function educationRest(ed) {
  var s = '';
  if (ed.major) s += ' ' + ed.major;
  if (ed.school) s += ', ' + ed.school;
  if (ed.start_year) s += ' (' + ed.start_year + '–' + (ed.end_year || 'Present') + ')';
  else if (ed.end_year) s += ' (' + ed.end_year + ')';
  return s;
}

// ── Students / Alumni ────────────────────────────────────────
// Exact same structure as layouts/partials/member-card-overlay.html
// box-slide forced visible (transform:translateY(0)) since hover N/A in preview
var MemberPreview = createClass({
  render: function () {
    var e   = this.props.entry;
    var ga  = this.props.getAsset;
    var name      = e.getIn(['data', 'title'],              '(이름)');
    var position  = e.getIn(['data', 'position'],           '');
    var email     = e.getIn(['data', 'email'],              '');
    var interests = e.getIn(['data', 'researchInterests']);
    var education = e.getIn(['data', 'education']);
    var current   = e.getIn(['data', 'current'],            '');
    var github    = e.getIn(['data', 'github'],             '');
    var linkedin  = e.getIn(['data', 'linkedin'],           '');
    var photo     = imgUrl(ga, e.getIn(['data', 'image']),  '/img/people/profile.png');

    var interestList  = interests ? interests.toJS()  : [];
    var educationList = education ? education.toJS() : [];

    return h('div', { style: { padding: '24px' } },
      previewBanner(),
      h('div', { className: 'col-lg-4 col-md-6' },
        h('div', { className: 'image-overlay position-relative' },
          h('div', { className: 'team-item rounded overflow-hidden' },
            h('div', { className: 'd-flex product-card' },
              // Photo
              h('div', { className: 'product-image' },
                h('img', { src: photo, alt: name, className: 'img-fluid',
                  onError: "this.src='/img/people/profile.png'" })
              ),
              // Info panel — force visible (box-slide is hidden off-screen without hover)
              h('div', {
                className: 'text-box box-slide position-absolute',
                style: { transform: 'translateY(0%)' }
              },
                h('div', { className: 'text-content p-3 bg-white', style: { fontSize: 'small' } },
                  h('h5', { style: { display: 'inline' }, className: 'text-team' }, name),
                  h('b', {}, '\u00a0 ', h('span', { className: 'small-text' }, position)),
                  h('p', {},
                    h('b', {}, 'Email'), ' ',
                    h('span', { className: 'small-text' }, email),
                    h('br')
                  ),
                  interestList.length > 0 && h('p', {},
                    h('b', {}, 'Research Interests'), h('br'),
                    h('span', { className: 'small-text' }, interestList.join(', '))
                  ),
                  educationList.length > 0 && h('p', {},
                    h('b', {}, 'Education'), h('br'),
                    // same format as layouts/partials/education-line.html
                    h('span', { className: 'small-text' },
                      educationList.map(function (ed, i) {
                        return h('span', { key: i }, h('b', {}, ed.degree || ''), educationRest(ed), h('br'));
                      })
                    )
                  ),
                  current && h('p', {},
                    h('b', {}, 'Current'), ' ',
                    h('span', { className: 'small-text' }, current)
                  ),
                  h('div', { className: 'team-social d-flex justify-content-end gap-1' },
                    (github || null) && h('a', {
                      className: 'btn btn-square btn-outline-primary rounded-circle',
                      href: github, target: '_blank', rel: 'noopener noreferrer'
                    }, h('i', { className: 'fab fa-github' })),
                    (linkedin || null) && h('a', {
                      className: 'btn btn-square btn-outline-primary rounded-circle',
                      href: linkedin, target: '_blank', rel: 'noopener noreferrer'
                    }, h('i', { className: 'fab fa-linkedin' }))
                  )
                )
              )
            ),
            h('div', { className: 'p-4' }),
            h('div', { className: 'p-1' })
          )
        )
      )
    );
  }
});

// ── Grants ───────────────────────────────────────────────────
// layouts/grants/list.html — card with logo + info
// 기간 표시는 layouts/partials/grant-date-range.html 과 같은 형식
//   "2017-01-01" → "Jan. 2017",  여러 구간은 " / " 로 연결
var MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function monthYear(v) {
  var m = /^(\d{4})-(\d{2})/.exec(String(v || ''));
  return m ? MONTH_ABBR[parseInt(m[2], 10) - 1] + '. ' + m[1] : '';
}
function grantDateRange(start, end, extraPeriods) {
  return [{ start_date: start, end_date: end }].concat(extraPeriods || [])
    .filter(function (p) { return p && p.start_date && p.end_date; })
    .map(function (p) { return monthYear(p.start_date) + ' - ' + monthYear(p.end_date); })
    .join(' / ');
}

var GrantPreview = createClass({
  render: function () {
    var e  = this.props.entry;
    var ga = this.props.getAsset;
    var title      = e.getIn(['data', 'title'], '(제목)');
    var titleSmall = e.getIn(['data', 'title_small'], '');
    var org        = e.getIn(['data', 'organization'], '');
    var subtitle   = e.getIn(['data', 'subtitle'], '');
    var extra      = e.getIn(['data', 'extra_periods']);
    var dateRange  = grantDateRange(
      e.getIn(['data', 'start_date'], ''),
      e.getIn(['data', 'end_date'], ''),
      extra && extra.toJS ? extra.toJS() : []
    );
    var status     = e.getIn(['data', 'status'], '');
    var logo       = imgUrl(ga, e.getIn(['data', 'img_url']), '');

    return h('div', { style: { padding: '24px' } },
      previewBanner(),
      h('div', { className: 'card mb-3', style: { width: '97%' } },
        h('div', { className: 'card-body', style: { display: 'flex', alignItems: 'center', gap: '1.5rem' } },
          logo && h('img', { src: logo, width: 110, style: { flexShrink: 0, marginTop: '1em', marginBottom: '1em' } }),
          h('div', {},
            h('h6', { className: 'card-title mb-2' },
              title,
              titleSmall && h('span', {}, h('br'), h('small', { className: 'text-muted' }, titleSmall))
            ),
            org      && h('p', { className: 'card-subtitle text-muted mb-1 small' }, org),
            subtitle && h('p', { className: 'card-subtitle text-muted mb-1 small' }, subtitle),
            dateRange&& h('p', { className: 'card-text text-muted mb-1 small' }, h('strong', {}, dateRange)),
            h('span', {
              className: 'badge',
              style: { background: status === 'Ongoing' ? '#1a668a' : '#6c757d', color: '#fff', fontSize: '0.75rem' }
            }, status)
          )
        )
      )
    );
  }
});

// ── Author line (Papers / Contributions) ─────────────────────
// layouts/partials/author-line.html 과 같은 규칙
//   <strong>First Author</strong>, Co-authors  — First Author가 없으면 Co-authors만 (앞 쉼표 없음)
function authorLine(first, co) {
  if (!first && !co) return null;
  return h('p', { className: 'card-subtitle text-muted mb-1 small' },
    first ? h('strong', {}, first) : null,
    // coauthors may contain HTML (<sup>†</sup>) — use dangerouslySetInnerHTML
    co ? h('span', { dangerouslySetInnerHTML: { __html: (first ? ', ' : '') + co } }) : null
  );
}

// ── Papers ───────────────────────────────────────────────────
// Exact structure of layouts/partials/pub-card.html
var PaperPreview = createClass({
  mixins: [LabMembersMixin],
  render: function () {
    var e  = this.props.entry;
    var ga = this.props.getAsset;
    var title     = e.getIn(['data', 'title'],       '(제목)');
    var first     = e.getIn(['data', 'firstAuthor'], '');
    var co        = e.getIn(['data', 'coauthors'],   '');
    var venue     = e.getIn(['data', 'venue'],       '');
    var yearMonth = e.getIn(['data', 'yearMonth'],   '');
    var doi       = e.getIn(['data', 'doi'],         '');
    var photo     = imgUrl(ga, e.getIn(['data', 'image']), '');

    return h('div', { style: { padding: '24px' } },
      labMembersBox(this.state.labMembers),
      previewBanner(),
      h('div', { className: 'card mb-3', style: { width: '97%' } },
        h('div', { className: 'card-body d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3' },
          // Thumbnail LEFT
          (photo || null) && h('div', {
            className: 'paper-thumb flex-shrink-0',
            style: { width: '320px', height: '185px', overflow: 'hidden', background: 'white', margin: 0 }
          },
            h('img', {
              src: photo, alt: '',
              style: { width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }
            })
          ),
          // Info RIGHT
          h('div', { className: 'flex-grow-1 d-flex flex-column justify-content-center', style: { minWidth: 0 } },
            h('h6', { className: 'card-title mb-2' },
              title,
              venue && h('span', {}, h('br'), h('small', { className: 'text-muted' }, venue))
            ),
            authorLine(first, co),
            h('p', { className: 'card-text text-muted mb-0 small' }, h('strong', {}, yearMonth)),
            (doi || null) && h('a', {
              href: doi, className: 'href-black card-text text-muted mb-0 small', target: '_blank',
              style: { wordBreak: 'break-word', overflowWrap: 'anywhere', whiteSpace: 'normal' }
            }, doi)
          )
        )
      )
    );
  }
});

// ── Standard Contributions ───────────────────────────────────
// layouts/partials/contrib-card-page.html
var ContributionPreview = createClass({
  mixins: [LabMembersMixin],
  render: function () {
    var e = this.props.entry;
    var title       = e.getIn(['data', 'title'], '(제목)');
    var org         = e.getIn(['data', 'organization'], '');
    var orgName     = e.getIn(['data', 'orgName'], '');
    var meetingName = e.getIn(['data', 'meetingName'], '');
    var firstAuthor = e.getIn(['data', 'firstAuthor'], '');
    var coauthors   = e.getIn(['data', 'coauthors'], '');
    var yearMonth   = e.getIn(['data', 'yearMonth'], '');
    var type        = e.getIn(['data', 'type'], '');

    return h('div', { style: { padding: '24px' } },
      labMembersBox(this.state.labMembers),
      previewBanner(),
      h('p', { style: { marginBottom: '8px' } },
        h('span', { className: 'badge bg-secondary me-2', style: { fontSize: '0.72rem' } }, type)
      ),
      h('div', { className: 'card mb-3', style: { width: '97%' } },
        h('div', { className: 'card-body', style: { display: 'flex', alignItems: 'center', gap: '1.5rem' } },
          h('div', {},
            h('h6', { className: 'card-title mb-2' },
              title,
              org         && h('span', {}, h('br'), h('small', { className: 'text-muted' }, org)),
              orgName     && h('span', {}, h('br'), h('small', { className: 'text-muted' }, orgName)),
              meetingName && h('span', {}, h('br'), h('small', { className: 'text-muted' }, meetingName))
            ),
            authorLine(firstAuthor, coauthors),
            h('p', { className: 'card-text text-muted mb-0 small' }, h('strong', {}, yearMonth))
          )
        )
      )
    );
  }
});

// ── Register all templates ────────────────────────────────────
CMS.registerPreviewTemplate('news',             NewsPreview);
CMS.registerPreviewTemplate('notices',          NoticePreview);
CMS.registerPreviewTemplate('gallery',          GalleryPreview);
CMS.registerPreviewTemplate('members-students', MemberPreview);
CMS.registerPreviewTemplate('members-alumni',   MemberPreview);
CMS.registerPreviewTemplate('grants',           GrantPreview);
CMS.registerPreviewTemplate('publications',     PaperPreview);
CMS.registerPreviewTemplate('contributions',    ContributionPreview);
