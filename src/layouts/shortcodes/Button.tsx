import DynamicIcon from "@/helpers/DynamicIcon";
import React from "react";

const Button = ({
  label,
  link,
  variant = "primary",
  type,
  icon,
  className = "",
  dataAos,
  dataAosDelay,
  buttonType = "submit",
}: {
  label: string;
  link?: string;
  variant?: "primary" | "secondary" | "light";
  type?: string;
  icon?: string;
  className?: string;
  dataAos?: string;
  dataAosDelay?: string;
  buttonType?: "submit" | "button" | "reset";
}) => {
  const baseClasses = `relative overflow-hidden group ${type || "btn"} ${className} ${
    variant === "secondary"
      ? "btn-secondary"
      : variant === "light"
        ? "btn-light"
        : "btn-primary"
  }`;

  const hoverEffectClasses = `absolute w-full h-full -left-full -bottom-full rounded-full group-hover:-left-1 group-hover:-bottom-1 group-hover:w-[110%] group-hover:h-[110%] transition-all duration-[550ms] ${
    variant === "secondary"
      ? "bg-light"
      : variant === "light"
        ? "bg-body"
        : "bg-text"
  }`;

  return link ? (
    <a
      href={link}
      className={baseClasses}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      {icon && (
        <DynamicIcon icon={icon} className="relative z-10 inline-block mr-2" />
      )}
      <span className="relative z-10">{label}</span>
      <div className={hoverEffectClasses} />
    </a>
  ) : (
    <button
      type={buttonType}
      className={baseClasses}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      {icon && (
        <DynamicIcon icon={icon} className="relative z-10 inline-block mr-2" />
      )}
      <span className="relative z-10">{label}</span>
      <div className={hoverEffectClasses} />
    </button>
  );
};

export default Button;
