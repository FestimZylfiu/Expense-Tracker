import styles from "./NotFoundPage.module.css";

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <img src='/404.svg' alt='404' className={styles.image} />
          </div>
          <p className={styles.message}>
            The stuff you were looking for {"doesn't"} exist
          </p>
          <a
            href='/'
            className={styles.button}
          >
            Take me home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
