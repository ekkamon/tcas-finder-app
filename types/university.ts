export interface Faculty {
  faculty_id: string;
  faculty_name_th: string;
  faculty_name_en: string;
}

export interface Course {
  branch_name_th: string;
  branch_name_en: string;
  graduated: {
    core: boolean;
    international: boolean;
    vocation: boolean;
    non_formol: boolean;
  };
  require_scores: any;
  require_credit: any;
  require_minimum_tcas_scores: any;
  calulate_scores: any;
}

export interface University {
  university_id: string;
  university_name_th: string;
  university_name_en: string;
  facultys: Array<Faculty>;
  course: Array<Course>;
}
