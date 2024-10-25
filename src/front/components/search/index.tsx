import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './index.scss'

const SearchComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

	const triggerRef = useRef(null);
  const searchRef = useRef(null);
  const magnifierRef = useRef(null);
  const lensRef = useRef(null);
  const handleRef = useRef(null);

  const toggle = () => {
    const trigger = triggerRef.current;
    const search = searchRef.current;
    const magnifier = magnifierRef.current;
    const lens = lensRef.current;
    const handle = handleRef.current;

    trigger.dataset.busy = true;
    const pressed = trigger.matches('[aria-pressed="true"]');
    setIsExpanded(!isExpanded);

    if (pressed) {
      gsap
        .timeline({
          onComplete: () => {
            trigger.dataset.busy = false;
            trigger.focus();
            gsap.set(magnifier, {
              clearProps: '--intent, scale, yPercent',
            });
          },
        })
        .to(handle, {
          '--hide': 0,
          duration: 0.1,
        })
        .to(lens, {
          width: 40,
          x: 0,
          duration: 0.1,
        })
        .to(
          search,
          {
            '--closed': 1,
            duration: 0.1,
          },
          '<'
        )
        .set(search, {
          display: 'none',
        })
        .to(magnifier, {
          yPercent: 0,
          scale: 0.5,
          duration: 0.1,
        });
    } else {
      gsap
        .timeline({
          onComplete: () => {
            trigger.dataset.busy = false;
            search.focus();
          },
        })
        .set(magnifier, {
          '--intent': 1,
        })
        .to(magnifier, {
          yPercent: 5,
          scale: 1,
          duration: 0.1,
        })
        .to(lens, {
          x: 20,
          width: 1,
          duration: 0.075,
          repeat: 2,
          yoyo: true,
          ease: 'power1.inOut',
        })
        .set(search, {
          display: 'block',
        })
        .to(lens, {
          x: -90,
          width: 220,
          duration: 0.35,
          ease: 'elastic.out(1,0.75)',
        })
        .to(
          handle,
          {
            '--hide': 1,
            duration: 0.35,
          },
          '<'
        )
        .to(
          search,
          {
            '--closed': 0,
            duration: 0.35,
            ease: 'elastic.out(1,0.75)',
          },
          '<'
        );
    }
  };

  return (
      <div className={styles.searchBox} >
        <button
          className={styles.trigger}
          aria-pressed={isExpanded}
          aria-expanded={isExpanded}
          aria-controls="form"
					ref={triggerRef}
          onClick={toggle}
        >
          <svg
            className={styles.magnifier}
						ref={magnifierRef}
            viewBox="0 0 40 40"
            fill="none"
          >
            <rect
              x="0"
              y="0"
              width="40"
              height="40"
              rx="20"
              ry="20"
              stroke="currentColor"
              strokeWidth="4"
							ref={lensRef}
             />
            <g>
              <line
                x1="20.5"
                x2="20.5"
                y1="20"
                y2="40"
								ref={handleRef}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="4"
               />
            </g>
          </svg>
        </button>
        <form id="form">
          <input
            placeholder="搜索关键词..."
            autoComplete="off"
            type="search"
						onBlur={toggle}
						className={styles.search}
						ref={searchRef}
            id="search"
            required
          />
        </form>
      </div>
  );
};

export default SearchComponent;